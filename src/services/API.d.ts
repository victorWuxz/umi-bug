declare namespace API {

    export interface PermissionItem {
        tag: string;
    }

    export interface CurrentRole {
        hasPermissions: PermissionItem[];
        nickName: string;
        name: string;
        tag: string;
        id: number;
    }
    export interface CurrentUser {
        displayName: string;
        avatar: string;
        currentRole: CurrentRole;
        hasRoles: CurrentRole[];
    }

    // 通用的返回格式
    export interface Res<R> {
        code: number;
        data: R;
        pager: {
            pageSize: number;
            current: number;
            total: number;
        };
        msg: string;
    }

    // 地区入参
    export interface AreaParams {
        parentId?: string;
    }

    // 地区option
    export interface AreaItem {
        areaId: number;
        name: string;
    }

    // 学校入参
    export interface SchoolParams {
        areaId?: string | number;
        name?: string;
    }
    // 学校option
    export interface SchoolItem {
        schoolId: number;
        name: string;
    }

    // 班课option
    export interface CalzzOptionItem {
        code: number;
        name: string;
    }

    export interface CalzzOptions {
        schoolTermEnumVOList: CalzzOptionItem[];
        schoolYearEnumVOList: CalzzOptionItem[];
        textbookVersionList: CalzzOptionItem[];
    }
}
