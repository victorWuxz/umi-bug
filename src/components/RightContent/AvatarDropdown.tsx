import React, {useCallback, useRef} from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import {Avatar, Menu, Spin} from 'antd';
import {MenuInfo} from 'rc-menu/es/interface';
import {useModel} from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps {
    menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
    // @ts-ignore
    const {initialState} = useModel('@@initialState');

    const formRef = useRef<HTMLFormElement>();

    /**
      * 退出登录，并且将当前的 url 保存
    */
    const onMenuClick = useCallback((event: MenuInfo) => {
        const {key} = event;
        if (key === 'logout') {
            formRef.current.submit();
        }
    }, []);

    const loading = (
        <span className={`${styles.action} ${styles.account}`}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const {currentUser} = initialState;
    const {displayName, avatar} = currentUser || {};

    if (!currentUser || !displayName) {
        return loading;
    }

    const menuHeaderDropdown = (
        // @ts-ignore
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="logout">
                <LogoutOutlined />
                退出登录
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <HeaderDropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
                    <span className={`${styles.name} anticon`}>
                        {displayName}
                    </span>
                </span>
            </HeaderDropdown>
            <form
                ref={formRef}
                action={`/material/logout?referUrl=${location.origin}`}
                method="post"
            />
        </>
    );
};

export default AvatarDropdown;
