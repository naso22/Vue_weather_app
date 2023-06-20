import { RouteRecordRaw } from "vue-router";

import TopPage from "@/pages/TopPage/Index.vue"
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: TopPage,
        children: [
            {
                path: "",
                component: TopPage,
            },
        ],
    },
];

export default routes;