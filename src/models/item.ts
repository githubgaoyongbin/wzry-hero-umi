import { Effect, Reducer, Subscription, request } from 'umi';

interface ItemProps {
    item_id: number;
    item_name: string;
    item_type: number;
    price: number;
    total_price: number;
    des1: string;
}

export interface ItemModelState {
    name: string;
    items: ItemProps[],
    filterKey: number
}

export interface ItemModelType {
    namespace: 'item';
    state: ItemModelState;
    effects: {
        query: Effect;
        fetch: Effect
    };
    reducers: {
        save: Reducer<ItemModelState>;
    };
    subscriptions: { setup: Subscription }
}

const ItemModel: ItemModelType = {
    namespace: 'item',

    state: {
        name: 'item',
        items: [],
        filterKey: 0
    },

    effects: {
        *query({ payload }, { call, put }) {

        },
        *fetch({ type, payload }, { put, call, select }) {
            const data = yield request('/web201605/js/item.json');
            yield put({
                type: 'save',
                payload: {
                    items: data,
                },
            });
            console.log('data', data)
        }
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
                if (pathname === '/item') {
                    dispatch({
                        type: 'fetch'
                    })
                }
            });
        }
    },
};

export default ItemModel;