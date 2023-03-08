function inputMaxBind(el, binding) {
  const { value } = binding;
  if (![undefined, null].includes(value)) {
    const input = el.getElementsByTagName("input")[0];
    if (input.value > value) {
      input.value = value;
      trigger(input, "input");
    }
  }
}

const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

export default {
  // 针对 el-input做的限制，只能输入正整数
  "input-int": {
    mounted(el) {
      const input = el.getElementsByTagName("input")[0];
      input.onkeyup = () => {
        input.value = input.value.toString().match(/^\d*/g, "")[0] || null;
        trigger(input, "input");
      };
      input.onblur = () => {
        input.value = input.value.toString().match(/^\d*/g, "")[0] || null;
        trigger(input, "input");
      };
    },
  },
  // 针对 el-input做的限制，只能输入正浮点
  //v-float=小数位数
  "input-float": {
    mounted(el, binding) {
      const input = el.getElementsByTagName("input")[0];
      let preg = /^\d*(\.?\d*)/g;
      if (parseInt(binding.value) > 0) {
        preg = new RegExp("^\\d*(\\.?\\d{0," + binding.value + "})", "g");
      }
      input.onkeyup = () => {
        input.value = input.value.toString().match(preg, "")[0] || null;
        trigger(input, "input");
      };
      input.onblur = () => {
        input.value = input.value.toString().match(preg, "")[0] || null;
        trigger(input, "input");
      };
    },
  },
  "positive-number": {
    mounted(el) {
      el.addEventListener("keypress", (e) => {
        e = e || window.event;
        let charcode = typeof e.charCode == "number" ? e.charCode : e.keyCode;
        let re = /\d/;
        if (charcode == 46) {
          if (el.value.includes(".")) {
            e.preventDefault();
          }
          return;
        } else if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      });
    },
  },
  "input-max": {
    update(el, binding) {
      inputMaxBind(el, binding);
    },
  },
  copy: {
    bind(el, { value }) {
      el.$value = value;
      el.handler = () => {
        if (!el.$value) {
          return;
        }
        const textarea = document.createElement("textarea");
        // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
        textarea.readOnly = "readonly";
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        textarea.value = el.$value;
        document.body.appendChild(textarea);
        textarea.select();
        const result = document.execCommand("Copy");
        if (result) {
          Message({
            message: "Copy Success !",
            type: "success",
          });
        }
        document.body.removeChild(textarea);
      };
      el.addEventListener("click", el.handler);
    },
    componentUpdated(el, { value }) {
      el.$value = value;
    },
    unbind(el) {
      el.removeEventListener("click", el.handler);
    },
  },
};
