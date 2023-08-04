import { classNames } from 'helpers/classNames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './OrderListSkeleton.scss';
import cls from '../../OrderCard/OrderCard.module.scss';
import ulCls from '../../OrdersList/OrderList.module.scss';

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
      <>
        <Skeleton width={200} height={25} containerClassName="text" />
        <div className={ulCls.btnsBox}>
          <Skeleton width={100} height={35} />
        </div>
        <Skeleton width={300} height={15} containerClassName="text" />
      </>
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
              <div className={cls.list}>
                <Skeleton width={280} height={60} />
                <Skeleton width={280} height={60} />
                <Skeleton width={280} height={60} />
                <Skeleton width={100} height={15} containerClassName="text" />
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
