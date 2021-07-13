import {useRequest} from 'umi';
import {
    fetchAreaList,
    fetchSchoolList,
    fetchClazzOptions,
} from '@/services/global';

export interface FilterItem {
    label: string;
    value: number | string;
    key: number | string;
    isLeaf?: boolean;
}

export interface Filters {
    termList: FilterItem[];
    yearList: FilterItem[];
    bookVersionList: FilterItem[];
}

export default function useFilterModel() {

    // 地区
    const {data: areaList, run: getAreaList} = useRequest<
        API.Res<API.AreaItem[]>,
        API.AreaParams[],
        FilterItem[]
    >(fetchAreaList, {
        manual: true,
        formatResult(res) {
            const {code, data} = res;
            if (code === 0 && data) {
                return data?.map(item => ({
                    label: item.name,
                    value: item.areaId,
                    key: item.areaId,
                    isLeaf: false
                })) || [];
            }
            return [];
        }
    }) || {};

    // 学校
    const {data: schoolList, run: getSchoolList} = useRequest<
        API.Res<API.SchoolItem[]>,
        API.SchoolParams[],
        FilterItem[]
    >(fetchSchoolList, {
        manual: true,
        formatResult(res) {
            const {code, data} = res;
            if (code === 0 && data) {
                return data?.map(item => ({
                    label: item.name,
                    value: item.schoolId,
                    key: item.schoolId,
                })) || [];
            }
            return [];
        }
    }) || {};

    // 班课相关枚举
    const {data: clazzOptions, run: getClazzOptions} = useRequest<
        API.Res<API.CalzzOptions>,
        undefined[],
        Filters
    >(fetchClazzOptions, {
        manual: true,
        formatResult(res) {
            const {code, data} = res;
            if (code === 0 && data) {
                const {
                    schoolTermEnumVOList,
                    schoolYearEnumVOList,
                    textbookVersionList
                } = data;
                const termList = schoolTermEnumVOList?.map(item => ({
                    label: item.name,
                    value: item.code,
                    key: item.code,
                })) || [];
                const yearList = schoolYearEnumVOList?.map(item => ({
                    label: item.name,
                    value: item.code,
                    key: item.code,
                })) || [];
                const bookVersionList = textbookVersionList?.map(item => ({
                    label: item.name,
                    value: item.code,
                    key: item.code,
                })) || [];
                return {
                    termList,
                    yearList,
                    bookVersionList
                };
            }
            return {
                termList: [],
                yearList: [],
                bookVersionList: [],
            };
        }
    }) || {};

    return {
        areaList: areaList || [],
        schoolList: schoolList || [],
        ...(clazzOptions || {}),
        getAreaList,
        getSchoolList,
        getClazzOptions,
    };
}
