import Vue from "vue";

import {
  TablePlugin,
  PaginationPlugin,
  NavPlugin,
  NavbarPlugin,
  DropdownPlugin,
  CardPlugin,
  ListGroupPlugin,
  SidebarPlugin,
  BadgePlugin,
  FormGroupPlugin,
  FormInputPlugin,
  InputGroupPlugin,
  ButtonPlugin,
  LayoutPlugin,
  AspectPlugin,
  TooltipPlugin,
  BIcon,
  BIconClockHistory,
  BIconCheck,
  BIconCheckCircleFill,
  BIconChevronRight,
  BIconChevronDown,
  BIconDownload,
  BIconFilter,
  BIconGithub,
  BIconArrowRepeat,
  BIconX,
  BIconClipboard,
  BIconXSquareFill,
  BIconQuestionCircle,
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// components
Vue.use(TablePlugin);
Vue.use(PaginationPlugin);
Vue.use(NavPlugin);
Vue.use(NavbarPlugin);
Vue.use(DropdownPlugin);
Vue.use(CardPlugin);
Vue.use(ListGroupPlugin);
Vue.use(SidebarPlugin);
Vue.use(BadgePlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(InputGroupPlugin);
Vue.use(ButtonPlugin);
Vue.use(LayoutPlugin);
Vue.use(AspectPlugin);
Vue.use(TooltipPlugin);

// icons
Vue.component("BIcon", BIcon);
Vue.component("BIconClockHistory", BIconClockHistory);
Vue.component("BIconCheck", BIconCheck);
Vue.component("BIconCheckCircleFill", BIconCheckCircleFill);
Vue.component("BIconChevronRight", BIconChevronRight);
Vue.component("BIconChevronDown", BIconChevronDown);
Vue.component("BIconDownload", BIconDownload);
Vue.component("BIconFilter", BIconFilter);
Vue.component("BIconGithub", BIconGithub);
Vue.component("BIconArrowRepeat", BIconArrowRepeat);
Vue.component("BIconX", BIconX);
Vue.component("BIconClipboard", BIconClipboard);
Vue.component("BIconXSquareFill", BIconXSquareFill);
Vue.component("BIconQuestionCircle", BIconQuestionCircle);
