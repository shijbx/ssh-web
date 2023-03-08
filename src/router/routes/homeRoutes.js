import dashboard from "./dashboard";
import sshProject from "./sshProject";
import sshServer from "./sshServer";
import settings from "./settings";

/**
 * meta:
 *  title 左侧菜单标题
 *  icon 左侧菜单图标
 *  notShow 不在左侧菜单显示
 */
const routes = [
  dashboard,
  sshProject,
  sshServer,
  settings,
];

export default routes;
