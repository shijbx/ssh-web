import { ref, computed } from "vue";
import http from "@/utils/http";

const serverList = ref(null);

const setServerList = (list = []) => {
  serverList.value = list.map((o) => {
    return {
      label: o.serverName,
      value: o.serverId,
    };
  });
};

const defaultServer = computed(() => {
  return [serverList.value?.[0]?.value, serverList.value?.[1]?.value];
  // const cities = serverList.value?.[0]?.children;
  // return [cities?.[0]?.value ?? null, cities?.[1]?.value ?? null];
});

export default () => {
  if (!serverList.value) {
    http.get("/ssh/serverProject/queryList?isValid=1").then((res) => {
      setServerList(res.data);
    });
  }
  return serverList;
};

export { defaultServer };
