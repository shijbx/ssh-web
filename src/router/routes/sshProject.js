import Layout from "@/components/Layout/index.vue";
import {Setting} from "@element-plus/icons";
import {shallowRef} from "vue";

export default {
    path: "/sshProject",
    redirect: "/sshProject/list",
    component: Layout,
    meta: {title: "项目管理", icon: shallowRef(Setting)},
    children: [
        {
            path: "/sshProject/list",
            name: "sshProjectList",
            component: () => import("@/views/SshProject/List.vue"),
        },
        {
            path: "/sshProject/add",
            name: "addProject",
            component: () => import("@/views/SshProject/Add.vue"),
            meta: {title: "新增项目", notShow: true},
        },
        {
            path: "/sshProject/edit/:id",
            name: "editProject",
            component: () => import("@/views/SshProject/Edit.vue"),
            meta: {title: "修改项目", notShow: true},
        },
    ],
};
