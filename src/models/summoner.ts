import { Effect, Reducer, Subscription, request } from 'umi';
interface SummonerProps {
    summoner_id: string;
    summoner_name: string;
    summoner_rank: string;
    summoner_description: string;
}
export interface SummonerModelState {
    name: string;
    summoners: SummonerProps[]
}

export interface SummonerModelType {
    namespace: 'summoner';
    state: SummonerModelState;
    effects: {
        query: Effect;
        fetch: Effect
    };
    reducers: {
        save: Reducer<SummonerModelState>;
    };
    subscriptions: { setup: Subscription }
}

const SummonerModel: SummonerModelType = {
    namespace: 'summoner',

    state: {
        name: 'summoner',
        summoners: []
    },

    effects: {
        *query({ payload }, { call, put }) {

        },
        *fetch({ type, payload }, { call, put }) {
            const data = yield request('/web201605/js/summoner.json');
            yield put({
                type: 'save',
                payload: {
                    summoners: data,
                },
            });
            
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    subscriptions: {
        // subscriptions 是一个全局的监听
        // 就是说，当设定触发条件满足时
        // 所有的 subscriptions 都会响应
        // 所以我们在这里判断了路由为当前路由时
        // 发起一个 effects 事件
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/summoner') {
                    dispatch({
                        type: 'fetch'
                    })
                }
            });
        }
    },
};

export default SummonerModel;