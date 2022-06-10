import React, { FC } from 'react';
import { Row, Col, Card, Radio } from 'antd'
import styles from './hero.less';
const RadioGroup = Radio.Group;
import { connect, HeroModelState, ConnectProps, HeroProps, history } from 'umi';
import FreeHeroItem from '@/components/FreeHeroItem';
const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];
interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const Hero: FC<PageProps> = (props) => {
  console.log('prop', props)
  const { heros, filterKey, freeheros, itemHover } = props.hero
  const onChange = e => {
    props.dispatch({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value
      }
    })
    console.log(e.target.value);
  };
  const onItemHover = e => {
    props.dispatch({
      type: 'hero/save',
      payload: {
        itemHover: e
      },
    });
  }
  const hanleClick = (item: HeroProps) => {
    // props.dispatch({
    //   type: 'hero/save',
    //   payload: {
    //     heroDetail: item
    //   },
    // });
    history.push('/herodetail/' + item.ename)
    console.log('item', item)
  }
  return (

    <div className={styles.normal}>
      <div className={styles.info}>
        <Row className={styles.freehero}>
          <Col span={24}>
            <p>周免英雄</p>
            <div>
              {freeheros.map((data, index) => (
                <FreeHeroItem
                  data={data}
                  itemHover={itemHover}
                  onItemHover={onItemHover}
                  thisIndex={index}
                  key={index}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey} className={styles.radioGroip}>
          {heroType.map(data => (
            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
        <Row>
          {heros
            .filter(item => filterKey === 0 || item.hero_type === filterKey)
            .reverse()
            .map(item => (
              <Col key={item.ename} span={3} className={styles.heroitem} onClick={() => hanleClick(item)}>
                <img src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`} />
                <p>{item.cname}</p>
              </Col>
            ))}
        </Row>
      </Card>
    </div>
  );
}
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(Hero);