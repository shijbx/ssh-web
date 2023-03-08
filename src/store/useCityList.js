import { ref, computed } from "vue";
import http from "@/utils/http";

const cityList = ref(null);

const setCityList = (list = []) => {
  cityList.value = list.map((o) => {
    return {
      label: o.cityAbbr,
      value: o.cityId,
    };
  });
};

const defaultCity = computed(() => {
  return [cityList.value?.[0]?.value, cityList.value?.[1]?.value];
  // const cities = cityList.value?.[0]?.children;
  // return [cities?.[0]?.value ?? null, cities?.[1]?.value ?? null];
});

export default () => {
  if (!cityList.value) {
    http.get("/base/queryCityList").then((res) => {
      setCityList(res.t);
    });
  }
  return cityList;
};

export { defaultCity };
