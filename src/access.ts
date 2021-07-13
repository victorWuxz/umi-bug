// src/access.ts
// 具体配置可参考：https://umijs.org/plugins/plugin-access
export default function access(initialState: {currentUser?: API.CurrentUser | undefined; hasPermissions?: string[]}) {
    const {hasPermissions} = initialState || {};
    // 页面界别权限tag
    const tagSets = new Set(hasPermissions || []);
    return {
        createAndEdit: tagSets.has('gaotu_material_bdh_upload'),
        canReadMaterial: tagSets.has('gaotu_material_bdh'),
    };
}
