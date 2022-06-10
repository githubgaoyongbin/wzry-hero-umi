import React from 'react';
import styles from './ename.less';
import { Descriptions } from 'antd';
import { connect, HeroModelState, ConnectProps, useParams } from 'umi';
import herolist from '../../../mock/herolist.json';
interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const HeroDetail: FC<PageProps> = ({ match, hero }) => {
  const heroType = {
    1: '战士',
    2: '法师',
    3: '坦克',
    4: '刺客',
    5: '射手',
    6: '辅助',
  };
  const params = useParams();
  const heroData = herolist.find(item => item.ename === +params.ename)
  const type = heroData.hero_type
  console.log('heroData', heroData)
  return (
    <div className={styles.normal}>
      <Descriptions title={`${heroData.title}`} bordered>
        <Descriptions.Item label="名称">{heroData.cname}</Descriptions.Item>
        <Descriptions.Item label="头像">
          <img src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${heroData.ename}/${heroData.ename}.jpg`} />
        </Descriptions.Item>
        <Descriptions.Item label="英雄标签">{heroData.skin_name}</Descriptions.Item>
        <Descriptions.Item label="英雄定位">{heroType[type]}</Descriptions.Item>
        <Descriptions.Item label="创建时间">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="公测时间" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>

        <Descriptions.Item label="金币原价">${80.00 * type}</Descriptions.Item>
        <Descriptions.Item label="折扣">{15.00 * type}%</Descriptions.Item>
        <Descriptions.Item label="折扣价格">${80.00 * type * (15.00 * type / 100)}</Descriptions.Item>
        <Descriptions.Item label="其他信息">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(HeroDetail);
