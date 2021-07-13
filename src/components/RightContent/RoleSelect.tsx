import React from 'react';
import {Select} from 'antd';
import {useModel} from 'umi';
import {useCreation, usePersistFn} from 'ahooks';
import Cookies from 'js-cookie';

export interface GlobalHeaderRightProps {
    menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
    // @ts-ignore
    const {initialState} = useModel('@@initialState');

    const {currentUser} = initialState;

    const {hasRoles} = currentUser || {};

    const roleOptions = useCreation(() => {
        const options = hasRoles?.filter(item => item?.id != null)?.map(item => ({
            key: item.tag,
            label: item.name,
            value: item.id,
        })) || [];
        return options;
    }, [hasRoles]);

    // 角色改变
    const handleRoleChange = usePersistFn(value => {
        const curRole = hasRoles?.find(item => item.id === value);
        const {tag} = curRole || {};
        Cookies.set('CAS_AC_CURRENT_ROLE', tag);
        window.location.reload();
    });

    return (
        <Select
            value={currentUser?.currentRole?.id}
            options={roleOptions}
            onChange={handleRoleChange}
            style={{width: 200}}
        />
    );
};

export default AvatarDropdown;
