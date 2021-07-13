// 代码中会兼容本地 service mock 以及部署站点的静态数据
const accountJson = {
    "code": 0,
    "data": {
        "id": 138,
        "name": "tangqiao",
        "avatar":
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513400773747&di=23967bec3bfe35bda1371a8f98a60db9&imgtype=0&src=http%3A%2F%2Fimg1.qq.com%2Fent%2Fpics%2F4614%2F4614495.jpg",
        "displayName": "途途",
        "mobile": "1232323232",
        "department": "总公司-流量变现部-商业产品",
        "manager": "中斌",
        "company": "总公司",
        "type": 0,
        "managerId": 41,
        "title": "产品设计师",
        "allowedApps": "null",
        "hasRoles": [
            {
                "id": 325,
                "name": "分公司经理",
                "createtime": 1435828461000,
                "type": 0,
                "nickName": "【新】权限分公司是经理",
                "appId": 1,
                "tag": "yunying_shizi_normal_jingli_fengongsitixi_tuozhan_",
                "parentAccountId": 7,
                "parentAccountRoleId": 365,
                "updated": 0,
                "status": 0,
                "openRoleUid": 1076,
                "parentOpenRoleUid": 1207,
                "hasPermissions": ["tag_a", "tag_b"]
            }
        ],
        "currentRole": {
            "id": 3254444,
            "name": "分公司经理",
            "createtime": 1435828461000,
            "type": 0,
            "nickName": "【新】权限分公司是经理",
            "appId": 1,
            "tag": "gaotu_boss_assistant_",
            "parentAccountId": 7,
            "parentAccountRoleId": 365,
            "updated": 0,
            "status": 0,
            "openRoleUid": 1076,
            "parentOpenRoleUid": 1207,
            "hasPermissions": [
                {
                    "tag": "gaotu_material_bdh_upload"
                },
                {
                    "tag": "gaotu_material_bdh"
                },
            ]
        }
    },
    "msg": "success",
};
export default {
    "POST /material/attribute/getAuth": (req, res) => {
        res.send({ ...accountJson });
    },
    "POST /material/attribute/getBusinessLine": (req, res) => {
        res.send({
            code: 0,
            data: {
                businessLine: 0 
            }
        });
    },
};
