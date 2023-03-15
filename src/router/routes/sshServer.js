import Layout from "@/components/Layout/index.vue";
import {Money} from "@element-plus/icons";
import {shallowRef} from "vue";

export default {
    path: "/sshServer",
    redirect: "/sshServer/list",
    component: Layout,
    meta: { title: "服务器管理" ,  icon: shallowRef(Money)},
    children: [
        {
            path: "/sshServer/list",
            name: "sshServerList",
            component: () => import("@/views/SshServer/List.vue"),
        },
        {
            path: "/sshServer/add",
            name: "addServer",
            component: () => import("@/views/SshServer/Add.vue"),
            meta: { title: "添加服务器" ,notShow: true},
        },
        {
            path: "/sshServer/edit/:id",
            name: "editServer",
            component: () => import("@/views/SshServer/Edit.vue"),
            meta: { title: "修改服务器" ,notShow: true},
        },
    ],
};
