import React, {ReactNode} from 'react';
import styles from './index.less';

export interface SimpleCardProps{
    style?: {
        [key:string]: number | string
    };
    className?: string;
    children?: ReactNode;
}

const SimpleCard: React.FC<SimpleCardProps> = props => {
    const {style, className, children} = props;

    return (
        <div className={`${styles.simplecard} ${className}`} style={style}>
            {children}
        </div>
    );
};

export default SimpleCard;

