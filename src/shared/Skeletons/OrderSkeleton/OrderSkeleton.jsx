import { classNames } from 'helpers/classNames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './OrderListSkeleton.scss';
import cls from '../../OrderCard/OrderCard.module.scss';
import ulCls from '../../../components/Orders/ui/OrdersList/OrderList.module.scss';

const skeletonData = [
  { topBlockWidth: 180, bottomBlockWidth: 200 },
  { topBlockWidth: 180, bottomBlockWidth: 220 },
  { topBlockWidth: 180, bottomBlockWidth: 220 },
  { topBlockWidth: 180, bottomBlockWidth: 220 },
  { topBlockWidth: 180, bottomBlockWidth: 220 },
  { topBlockWidth: 180, bottomBlockWidth: 220 },
];

const OrderListSkeleton = ({ isSmall, isWaiter }) => {
  const renderTopBlock = () => {
    return (
      <div className="topBox">
        <Skeleton width={200} height={25} containerClassName="text" />
        <Skeleton width={100} height={35} containerClassName="text" />
        <Skeleton width={300} height={15} containerClassName="text" />
      </div>
    );
  };
  if (isWaiter) {
    return (
      <div className={classNames(ulCls.box, { [ulCls.isWaiter]: isWaiter }, [])}>
        {renderTopBlock()}
        <div className={ulCls.list}>
          {skeletonData.map((_, index) => (
            <div key={index} className={classNames(cls.item, { [cls.isSmall]: isSmall }, [])}>
              <div className={cls.topBlock}>
                <Skeleton width={200} height={20} />
                <Skeleton width={20} height={15} />
                <Skeleton width={50} height={15} />
              </div>
              <Skeleton width={50} height={15} />
              <div className="skeletonList">
                <Skeleton
                  width={280}
                  height={70}
                  borderRadius={40}
                  containerClassName="firstDish"
                />
                <Skeleton width={280} height={70} borderRadius={40} containerClassName="text" />
                <Skeleton width={280} height={70} borderRadius={40} containerClassName="text" />
                <Skeleton width={100} height={15} containerClassName="text lastText" />
                <Skeleton width={70} height={15} containerClassName="text" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={classNames(ulCls.box, { [ulCls.isWaiter]: isWaiter }, [])}>
      {renderTopBlock()}
      <div className={ulCls.list}>
        {skeletonData.map((data, index) => (
          <div key={index} className={classNames(cls.item, { [cls.isSmall]: isSmall }, [])}>
            <div className={cls.topBlock}>
              <Skeleton width={data.topBlockWidth} height={15} />
              <Skeleton width={20} height={15} />
              <Skeleton width={50} height={15} />
            </div>
            <div className={classNames(cls.bottomBlock, { [cls.isSmall]: isSmall }, [])}>
              <Skeleton width={data.bottomBlockWidth} height={25} />
              <Skeleton width={50} height={25} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderListSkeleton;