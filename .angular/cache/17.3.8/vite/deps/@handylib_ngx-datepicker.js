import {
  require_moment
} from "./chunk-XDZUG772.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-KU7DBYGS.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf
} from "./chunk-GHNX2FK5.js";
import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Inject,
  Injectable,
  Input,
  NgModule,
  ViewChild,
  ViewContainerRef,
  forwardRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-423AQJJD.js";
import "./chunk-SG3BCSKH.js";
import "./chunk-SAVXX6OM.js";
import "./chunk-PQ7O3X3G.js";
import {
  __toESM
} from "./chunk-EHLZM3EC.js";

// node_modules/@handylib/ngx-datepicker/fesm2020/handylib-ngx-datepicker.mjs
var import_moment = __toESM(require_moment(), 1);
var _c0 = ["container"];
function DatepickerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵlistener("click", function DatepickerComponent_div_0_Template_div_click_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.closeDatePicker());
    });
    ɵɵelementEnd();
  }
}
function DatepickerComponent_div_3_div_3_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_3_button_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.config.view = "yearpicker");
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.config.view == "yearpicker" ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.getFormated("YYYY"));
  }
}
function DatepickerComponent_div_3_div_3_span_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1, ", ");
    ɵɵelementEnd();
  }
}
function DatepickerComponent_div_3_div_3_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_3_button_8_Template_button_click_0_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.config.view = "yearpicker");
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.config.view == "yearpicker" ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.getFormated("YYYY"));
  }
}
function DatepickerComponent_div_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 16);
    ɵɵtemplate(1, DatepickerComponent_div_3_div_3_button_1_Template, 2, 4, "button", 17);
    ɵɵelementStart(2, "div")(3, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_3_Template_button_click_3_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.config.view = "monthpicker");
    });
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_3_Template_button_click_5_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.config.view = "datepicker");
    });
    ɵɵtext(6);
    ɵɵtemplate(7, DatepickerComponent_div_3_div_3_span_7_Template, 2, 0, "span", 18);
    ɵɵelementEnd();
    ɵɵtemplate(8, DatepickerComponent_div_3_div_3_button_8_Template, 2, 4, "button", 17);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.mode == "datetime");
    ɵɵadvance(2);
    ɵɵclassMap(ctx_r2.config.view == "monthpicker" ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.getFormated("MMM"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.config.view == "datepicker" ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate1("", ctx_r2.getFormated("DD"), " ");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.mode == "date");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.mode == "date");
  }
}
function DatepickerComponent_div_3_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 16)(1, "button", 19);
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.getFormated("MMMM"));
  }
}
function DatepickerComponent_div_3_div_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 16)(1, "button", 19);
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.getFormated("YYYY"));
  }
}
function DatepickerComponent_div_3_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 20)(1, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_6_Template_button_click_1_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext(2);
      ctx_r2.config.view = "timepicker";
      return ɵɵresetView(ctx_r2.config.timepicker = "hour");
    });
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "span");
    ɵɵtext(4, ":");
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_6_Template_button_click_5_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext(2);
      ctx_r2.config.view = "timepicker";
      return ɵɵresetView(ctx_r2.config.timepicker = "minute");
    });
    ɵɵtext(6);
    ɵɵelementEnd();
    ɵɵelementStart(7, "div")(8, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_6_Template_button_click_8_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.setAmPm("AM"));
    });
    ɵɵtext(9, "AM");
    ɵɵelementEnd();
    ɵɵelementStart(10, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_6_Template_button_click_10_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.setAmPm("PM"));
    });
    ɵɵtext(11, "PM");
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵstyleProp("padding-top", ctx_r2.config.mode == "datetime" ? 29 : 0, "px");
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.config.view == "timepicker" && ctx_r2.config.timepicker == "hour" ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.getFormated("hh"));
    ɵɵadvance(3);
    ɵɵclassMap(ctx_r2.config.view == "timepicker" && ctx_r2.config.timepicker == "minute" ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.getFormated("mm"));
    ɵɵadvance(2);
    ɵɵclassMap(ctx_r2.isCurrent("am", "ampm") ? "active" : "");
    ɵɵadvance(2);
    ɵɵclassMap(ctx_r2.isCurrent("pm", "ampm") ? "active" : "");
  }
}
function DatepickerComponent_div_3_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 21)(1, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_7_Template_button_click_1_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.setPrevMonth());
    });
    ɵɵelement(2, "i", 22);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div");
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_7_Template_button_click_5_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.setNextMonth());
    });
    ɵɵelement(6, "i", 23);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r2.getFormated("MMMM DD"));
  }
}
function DatepickerComponent_div_3_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 21)(1, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_8_Template_button_click_1_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.setPrevYearRange());
    });
    ɵɵelement(2, "i", 22);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div");
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_8_Template_button_click_5_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.setNextYearRange());
    });
    ɵɵelement(6, "i", 23);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(4);
    ɵɵtextInterpolate2("", ctx_r2.config.startYear - 8, " - ", ctx_r2.config.startYear + 7, "");
  }
}
function DatepickerComponent_div_3_div_10_li_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li")(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const week_r11 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.limitChar(week_r11, 3));
  }
}
function DatepickerComponent_div_3_div_10_li_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li");
    ɵɵelement(1, "span");
    ɵɵelementEnd();
  }
}
function DatepickerComponent_div_3_div_10_li_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_10_li_5_Template_li_click_0_listener() {
      const d_r13 = ɵɵrestoreView(_r12).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.setDate(d_r13.date));
    });
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const d_r13 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.isCurrent(d_r13.formated, "date") ? "active" : "");
    ɵɵadvance(2);
    ɵɵtextInterpolate(d_r13.date);
  }
}
function DatepickerComponent_div_3_div_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 24)(1, "ul", 25);
    ɵɵtemplate(2, DatepickerComponent_div_3_div_10_li_2_Template, 3, 1, "li", 26);
    ɵɵelementEnd();
    ɵɵelementStart(3, "ul", 27);
    ɵɵtemplate(4, DatepickerComponent_div_3_div_10_li_4_Template, 2, 0, "li", 26)(5, DatepickerComponent_div_3_div_10_li_5_Template, 3, 4, "li", 28);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.config.weeks);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.getPrefixDays());
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.getDatesInMonthArray())("ngForTrackBy", ctx_r2.trackBy);
  }
}
function DatepickerComponent_div_3_div_11_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1, "Select Hour");
    ɵɵelementEnd();
  }
}
function DatepickerComponent_div_3_div_11_ul_2_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li")(1, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_11_ul_2_li_1_Template_button_click_1_listener() {
      const h_r15 = ɵɵrestoreView(_r14).index;
      const ctx_r2 = ɵɵnextContext(4);
      ctx_r2.setHour(h_r15 + 1);
      return ɵɵresetView(ctx_r2.config.timepicker = "minute");
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const h_r15 = ctx.index;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.isCurrent(h_r15 + 1, "hour") ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(h_r15 + 1);
  }
}
function DatepickerComponent_div_3_div_11_ul_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 32);
    ɵɵtemplate(1, DatepickerComponent_div_3_div_11_ul_2_li_1_Template, 3, 4, "li", 26);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.getArrayOf(12));
  }
}
function DatepickerComponent_div_3_div_11_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1, "Select minute");
    ɵɵelementEnd();
  }
}
function DatepickerComponent_div_3_div_11_ul_4_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li")(1, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_11_ul_4_li_1_Template_button_click_1_listener() {
      const m_r17 = ɵɵrestoreView(_r16).index;
      const ctx_r2 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r2.setMinute(m_r17 + 1));
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const m_r17 = ctx.index;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.isCurrent(m_r17 + 1, "minute") ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(m_r17 + 1);
  }
}
function DatepickerComponent_div_3_div_11_ul_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 33);
    ɵɵtemplate(1, DatepickerComponent_div_3_div_11_ul_4_li_1_Template, 3, 4, "li", 26);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.getArrayOf(60));
  }
}
function DatepickerComponent_div_3_div_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 29);
    ɵɵtemplate(1, DatepickerComponent_div_3_div_11_span_1_Template, 2, 0, "span", 18)(2, DatepickerComponent_div_3_div_11_ul_2_Template, 2, 1, "ul", 30)(3, DatepickerComponent_div_3_div_11_span_3_Template, 2, 0, "span", 18)(4, DatepickerComponent_div_3_div_11_ul_4_Template, 2, 1, "ul", 31);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.timepicker == "hour");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.timepicker == "hour");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.timepicker == "minute");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.timepicker == "minute");
  }
}
function DatepickerComponent_div_3_div_12_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li")(1, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_12_li_2_Template_button_click_1_listener() {
      const m_r19 = ɵɵrestoreView(_r18).index;
      const ctx_r2 = ɵɵnextContext(3);
      ctx_r2.setMonth(m_r19);
      return ɵɵresetView(ctx_r2.config.view = "datepicker");
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const month_r20 = ctx.$implicit;
    const m_r19 = ctx.index;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.isCurrent(m_r19 + 1 + "", "month") ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(month_r20);
  }
}
function DatepickerComponent_div_3_div_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 29)(1, "ul", 34);
    ɵɵtemplate(2, DatepickerComponent_div_3_div_12_li_2_Template, 3, 4, "li", 26);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.config.months);
  }
}
function DatepickerComponent_div_3_div_13_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li")(1, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_div_13_li_2_Template_button_click_1_listener() {
      const year_r22 = ɵɵrestoreView(_r21).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      ctx_r2.setYear(year_r22);
      return ɵɵresetView(ctx_r2.config.view = ctx_r2.config.mode == "year" ? "yearpicker" : "datepicker");
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const year_r22 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.isCurrent(year_r22, "year") ? "active" : "");
    ɵɵadvance();
    ɵɵtextInterpolate(year_r22);
  }
}
function DatepickerComponent_div_3_div_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 29)(1, "ul", 35);
    ɵɵtemplate(2, DatepickerComponent_div_3_div_13_li_2_Template, 3, 4, "li", 26);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.getYearsRange());
  }
}
function DatepickerComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 5)(1, "div", 6)(2, "div", 7);
    ɵɵtemplate(3, DatepickerComponent_div_3_div_3_Template, 9, 11, "div", 8)(4, DatepickerComponent_div_3_div_4_Template, 3, 1, "div", 8)(5, DatepickerComponent_div_3_div_5_Template, 3, 1, "div", 8)(6, DatepickerComponent_div_3_div_6_Template, 12, 16, "div", 9);
    ɵɵelementEnd();
    ɵɵtemplate(7, DatepickerComponent_div_3_div_7_Template, 7, 1, "div", 10)(8, DatepickerComponent_div_3_div_8_Template, 7, 2, "div", 10);
    ɵɵelementEnd();
    ɵɵelementStart(9, "div", 11);
    ɵɵtemplate(10, DatepickerComponent_div_3_div_10_Template, 6, 4, "div", 12)(11, DatepickerComponent_div_3_div_11_Template, 5, 4, "div", 13)(12, DatepickerComponent_div_3_div_12_Template, 3, 1, "div", 13)(13, DatepickerComponent_div_3_div_13_Template, 3, 1, "div", 13);
    ɵɵelementEnd();
    ɵɵelementStart(14, "div", 14)(15, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_Template_button_click_15_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.closeDatePicker());
    });
    ɵɵtext(16, "Cancel");
    ɵɵelementEnd();
    ɵɵelementStart(17, "button", 15);
    ɵɵlistener("click", function DatepickerComponent_div_3_Template_button_click_17_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.apply());
    });
    ɵɵtext(18, "Apply");
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r2.config.mode == "date" || ctx_r2.config.mode == "datetime");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.mode == "month");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.mode == "year");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.mode == "time" || ctx_r2.config.mode == "datetime");
    ɵɵadvance();
    ɵɵproperty("ngIf", (ctx_r2.config.mode == "date" || ctx_r2.config.mode == "datetime") && ctx_r2.config.view == "datepicker");
    ɵɵadvance();
    ɵɵproperty("ngIf", (ctx_r2.config.mode == "date" || ctx_r2.config.mode == "datetime" || ctx_r2.config.mode == "year") && ctx_r2.config.view == "yearpicker");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.config.view == "datepicker" && (ctx_r2.config.mode == "date" || ctx_r2.config.mode == "datetime"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.view == "timepicker");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.view == "monthpicker" || ctx_r2.config.mode == "month");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.view == "yearpicker" || ctx_r2.config.mode == "year");
  }
}
var NgxDatepickerService = class {
  constructor() {
  }
};
NgxDatepickerService.ɵfac = function NgxDatepickerService_Factory(t) {
  return new (t || NgxDatepickerService)();
};
NgxDatepickerService.ɵprov = ɵɵdefineInjectable({
  token: NgxDatepickerService,
  factory: NgxDatepickerService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDatepickerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var DatepickerComponent = class {
  constructor(document2, cdRef) {
    this.document = document2;
    this.cdRef = cdRef;
    this.show = false;
    this.format = "YYYY-MM-DD HH:mm:ss";
    this.config = {
      mode: "datetime",
      view: "datepicker",
      timepicker: "",
      position: {
        x: 0,
        y: 0
      },
      startYear: (/* @__PURE__ */ new Date()).getFullYear(),
      icons: {
        left: "🡰",
        right: "🡲",
        up: "🡱",
        down: "🡳"
      },
      weeks: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    this._value = "";
    this.onApply = (_v) => {
    };
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (value !== "" && value !== null && typeof value !== "undefined") {
      if ((0, import_moment.default)(value, this.format).isValid()) {
        this._value = value;
      } else {
        console.log("Invalid date");
      }
    }
  }
  trackBy(n) {
    return n;
  }
  getPrefixDays() {
    var date = (0, import_moment.default)(this.value, this.format).startOf("month");
    var day = Number(date.format("d"));
    return new Array(day);
  }
  getDatesInMonthArray() {
    var dates = [];
    var a = (0, import_moment.default)(this.value, this.format).startOf("month").format("YYYY-MM-DD");
    var b = (0, import_moment.default)(this.value, this.format).endOf("month").format("YYYY-MM-DD");
    for (var m = (0, import_moment.default)(a); m.diff(b, "days") <= 0; m.add(1, "days")) {
      dates.push({
        date: m.format("D"),
        formated: m.format("YYYY-MM-DD")
      });
    }
    return dates;
  }
  getDaysInMonth() {
    return new Array((0, import_moment.default)().daysInMonth());
  }
  getArrayOf(n) {
    return new Array(n);
  }
  titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
  }
  prefixZero(n) {
    return ("0" + n).slice(-2);
  }
  limitChar(str, n) {
    return str.substring(0, n);
  }
  setNextYearRange() {
    this.config.startYear = this.config.startYear + 15;
  }
  setPrevYearRange() {
    this.config.startYear = this.config.startYear - 14;
  }
  setNextMonth() {
    this.value = (0, import_moment.default)(this.value, this.format).add(1, "M").format(this.format);
  }
  setPrevMonth() {
    this.value = (0, import_moment.default)(this.value, this.format).add(-1, "M").format(this.format);
  }
  getYearsRange() {
    var years = [];
    var startYear = this.config.startYear - 8;
    var endYear = this.config.startYear + 7;
    for (var y = startYear; y <= endYear; y++) {
      years.push(y);
    }
    return years;
  }
  setPosition() {
    var inst = this;
    var directiveRect = inst.element.nativeElement.getBoundingClientRect();
    var containerRect = inst.container.nativeElement.getBoundingClientRect();
    if (window.innerWidth <= 600 || window.innerHeight <= 600) {
      inst.config.position.x = (window.innerWidth - containerRect.width) / 2;
      inst.config.position.y = (window.innerHeight - containerRect.height) / 2;
      inst.cdRef.detectChanges();
      return {
        container: containerRect,
        directive: directiveRect
      };
    }
    if (window.innerHeight <= directiveRect.height + containerRect.height + directiveRect.y) {
      inst.config.position.x = (window.innerWidth - containerRect.width) / 2;
      inst.config.position.y = (window.innerHeight - containerRect.height) / 2;
    } else if (window.innerWidth <= directiveRect.width + containerRect.width + directiveRect.x) {
      inst.config.position.y = directiveRect.y + directiveRect.height;
      inst.config.position.x = directiveRect.x - containerRect.width + directiveRect.width;
    } else {
      inst.config.position.x = directiveRect.x;
      inst.config.position.y = directiveRect.y + directiveRect.height;
    }
    inst.cdRef.detectChanges();
    return {
      container: containerRect,
      directive: directiveRect
    };
  }
  getFormated(format) {
    return (0, import_moment.default)(this.value, this.format).format(format);
  }
  isCurrent(value, mode) {
    if (mode == "hour") {
      if (value == (0, import_moment.default)(this.value, this.format).format("h")) {
        return true;
      }
    } else if (mode == "minute") {
      if (value == (0, import_moment.default)(this.value, this.format).format("m")) {
        return true;
      }
    } else if (mode == "ampm") {
      if (value.toLowerCase() == (0, import_moment.default)(this.value, this.format).format("A").toLowerCase()) {
        return true;
      }
    } else if (mode == "date") {
      if (value == (0, import_moment.default)(this.value, this.format).format("YYYY-MM-DD")) {
        return true;
      }
    } else if (mode == "month") {
      if (value.toString().toLowerCase() == (0, import_moment.default)(this.value, this.format).format("M").toLowerCase()) {
        return true;
      }
    } else if (mode == "year") {
      if (value.toString().toLowerCase() == (0, import_moment.default)(this.value, this.format).format("YYYY").toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  setAmPm(value) {
    var date = (0, import_moment.default)(this.value, this.format).format("YYYY-MM-DD hh:mm:ss A");
    date = date.replace("AM", value).replace("PM", value);
    this.value = (0, import_moment.default)(date, "YYYY-MM-DD hh:mm:ss A").format(this.format);
  }
  setDate(value) {
    this.value = (0, import_moment.default)(this.value, this.format).set("D", value).format(this.format);
  }
  setMonth(value) {
    this.value = (0, import_moment.default)(this.value, this.format).set("M", value).format(this.format);
  }
  setYear(value) {
    this.value = (0, import_moment.default)(this.value, this.format).set("year", value).format(this.format);
  }
  setHour(value) {
    this.value = (0, import_moment.default)(this.value, this.format).set("h", value).format(this.format);
  }
  setMinute(value) {
    this.value = (0, import_moment.default)(this.value, this.format).set("m", value).format(this.format);
    if (this.config.mode == "time") {
      this.config.timepicker = "";
    } else {
      this.config.view = "datepicker";
    }
  }
  apply() {
    this.onApply(this.value);
    this.closeDatePicker();
  }
  openDatePicker(event) {
    document.body.style.overflow = "hidden";
    var inst = this;
    inst.show = true;
    if (inst._value == "") {
      inst._value = (0, import_moment.default)().format(inst.format);
    }
    var interval = setInterval(function() {
      var rects = inst.setPosition();
      if (rects.container.height > 0) {
        clearInterval(interval);
      }
    });
    inst.cdRef.detectChanges();
  }
  closeDatePicker() {
    var inst = this;
    inst.show = false;
    document.body.style.overflow = "auto";
  }
  ngAfterViewInit() {
    var inst = this;
    inst.element.nativeElement.onfocus = inst.openDatePicker.bind(this);
    inst.element.nativeElement.onclick = inst.openDatePicker.bind(this);
    inst.setPosition();
    if (typeof window !== "undefined") {
      window.onscroll = function() {
        inst.setPosition();
        inst.cdRef.detectChanges();
      };
      window.onresize = function() {
        inst.setPosition();
        inst.cdRef.detectChanges();
      };
    }
  }
  ngOnInit() {
    var inst = this;
  }
};
DatepickerComponent.ɵfac = function DatepickerComponent_Factory(t) {
  return new (t || DatepickerComponent)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(ChangeDetectorRef));
};
DatepickerComponent.ɵcmp = ɵɵdefineComponent({
  type: DatepickerComponent,
  selectors: [["datepicker"]],
  viewQuery: function DatepickerComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.container = _t.first);
    }
  },
  inputs: {
    element: "element",
    format: "format"
  },
  decls: 4,
  vars: 6,
  consts: [["container", ""], ["class", "datepicker-overlay", 3, "click", 4, "ngIf"], [1, "datepicker-fixed", 3, "click"], ["class", "datepicker-container", 4, "ngIf"], [1, "datepicker-overlay", 3, "click"], [1, "datepicker-container"], [1, "datepicker-header"], [1, "datepicker-header-label"], ["class", "datepicker-header-label-date", 4, "ngIf"], ["class", "datepicker-header-label-time", 3, "paddingTop", 4, "ngIf"], ["class", "datepicker-header-action", 4, "ngIf"], [1, "datepicker-body"], ["class", "datepicker-datepicker", 4, "ngIf"], ["class", "picker", 4, "ngIf"], [1, "datepicker-footer"], [3, "click"], [1, "datepicker-header-label-date"], [3, "class", "click", 4, "ngIf"], [4, "ngIf"], [1, "active"], [1, "datepicker-header-label-time"], [1, "datepicker-header-action"], [1, "fa", "fa-arrow-left"], [1, "fa", "fa-arrow-right"], [1, "datepicker-datepicker"], [1, "datepicker-weeks"], [4, "ngFor", "ngForOf"], [1, "datepicker-dates"], [3, "class", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "picker"], ["class", "picker-col-3", 4, "ngIf"], ["class", "picker-col-6", 4, "ngIf"], [1, "picker-col-3"], [1, "picker-col-6"], [1, "picker-col-2"], [1, "picker-col-4"]],
  template: function DatepickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵtemplate(0, DatepickerComponent_div_0_Template, 1, 0, "div", 1);
      ɵɵelementStart(1, "div", 2, 0);
      ɵɵlistener("click", function DatepickerComponent_Template_div_click_1_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.setPosition());
      });
      ɵɵtemplate(3, DatepickerComponent_div_3_Template, 19, 10, "div", 3);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.show);
      ɵɵadvance();
      ɵɵstyleProp("top", ctx.config.position.y, "px")("left", ctx.config.position.x, "px");
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.show);
    }
  },
  dependencies: [NgForOf, NgIf],
  styles: [".datepicker-overlay[_ngcontent-%COMP%]{position:fixed;z-index:9999;background:rgba(0,0,0,.1215686275);width:100%;height:100%;left:0;top:0}.datepicker-fixed[_ngcontent-%COMP%]{width:100%;max-width:300px;z-index:999999;position:fixed}.datepicker-container[_ngcontent-%COMP%]{box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;width:100%}.datepicker-header-label[_ngcontent-%COMP%]{background:#3f51b5;color:#fff;display:flex;flex-direction:row;justify-content:center;padding:10px}.datepicker-header-action[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.datepicker-header-action[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center}.datepicker-header-action[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{border:none;background:transparent;height:40px}.datepicker-footer[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{border:none;background:#fff;border-radius:5px;font-size:15px;padding:5px 20px}.datepicker-footer[_ngcontent-%COMP%]{padding:10px;display:flex;flex-direction:row;width:100%}.datepicker-footer[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]:last-child{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;margin-left:auto}ul.datepicker-weeks[_ngcontent-%COMP%]{list-style:none;padding:10px 0;margin:0;display:flex;flex-direction:row;border-bottom:1px solid #ddd}ul.datepicker-weeks[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center;font-size:12px}ul.datepicker-dates[_ngcontent-%COMP%]{padding:0;margin:0;list-style:none;display:block}ul.datepicker-dates[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{width:14.28%;display:inline-block;align-items:center;justify-content:center;font-size:12px;position:relative;padding-top:14.28%;float:left}ul.datepicker-dates[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer}ul.datepicker-dates[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:hover{background:#ddd}ul.datepicker-dates[_ngcontent-%COMP%] > li.active[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{background:#3f51b5;color:#fff}.datepicker-header-label-date[_ngcontent-%COMP%], .datepicker-header-label-time[_ngcontent-%COMP%]{display:flex}.datepicker-header-label-date[_ngcontent-%COMP%]{flex-direction:column}.datepicker-header-label-time[_ngcontent-%COMP%]{flex-direction:row}.datepicker-header-label[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:transparent;color:#fff;opacity:.5;transition:.5s all ease;border:none}.datepicker-header-label[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{opacity:1}.datepicker-header-label[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{opacity:.8}.datepicker-header-label-date[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{width:100%;text-align:left}.datepicker-header-label-date[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{font-size:18px}.datepicker-header-label-date[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row}.datepicker-header-label-date[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{font-size:35px;line-height:30px}.datepicker-header-label-time[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{font-size:35px;line-height:30px}.datepicker-header-label-time[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:30px;line-height:0px;width:5px;justify-content:center;align-items:center;height:100%;display:flex}.datepicker-header-label-time[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.datepicker-header-label-time[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{font-size:15px;line-height:15px}.picker[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:14px;display:block;width:100%;padding:5px}.picker[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:flex;flex-direction:row;flex-wrap:wrap;max-height:250px;overflow:auto}ul.picker-col-2[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{width:50%}ul.picker-col-3[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{width:33.33%}ul.picker-col-4[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{width:25%}ul.picker-col-6[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{width:16.66%}.picker[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{padding:5px}.picker[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{width:100%;border:none;padding:5px;font-size:12px;border-radius:5px;background:rgba(0,0,0,.0392156863)}.picker[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]:hover{background:#ddd}.picker[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > button.active[_ngcontent-%COMP%]{background:#3f51b5;color:#fff}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatepickerComponent, [{
    type: Component,
    args: [{
      selector: "datepicker",
      template: `<div class="datepicker-overlay" (click)="closeDatePicker()" *ngIf="show"></div>\r
<div #container class="datepicker-fixed" [style.top.px]="config.position.y" [style.left.px]="config.position.x" (click)="setPosition()">\r
    <div class="datepicker-container" *ngIf="show">\r
        <div class="datepicker-header">\r
            <div class="datepicker-header-label">\r
                <div class="datepicker-header-label-date" *ngIf="config.mode == 'date' || config.mode == 'datetime'">\r
                    <button (click)="config.view='yearpicker'" class="{{config.view == 'yearpicker' ? 'active' : ''}}" *ngIf="config.mode == 'datetime'">{{getFormated('YYYY')}}</button>\r
                    <div>\r
                        <button (click)="config.view='monthpicker'" class="{{config.view == 'monthpicker' ? 'active' : ''}}">{{getFormated('MMM')}}</button>\r
                        <button (click)="config.view='datepicker'" class="{{config.view == 'datepicker' ? 'active' : ''}}">{{getFormated('DD')}} <span *ngIf="config.mode == 'date'">, </span></button>\r
                        <button (click)="config.view='yearpicker'" class="{{config.view == 'yearpicker' ? 'active' : ''}}" *ngIf="config.mode == 'date'">{{getFormated('YYYY')}}</button>\r
                    </div>\r
                </div>\r
                <div class="datepicker-header-label-date" *ngIf="config.mode == 'month'">\r
                    <button class="active">{{getFormated('MMMM')}}</button>\r
                </div>\r
                <div class="datepicker-header-label-date" *ngIf="config.mode == 'year'">\r
                    <button class="active">{{getFormated('YYYY')}}</button>\r
                </div>\r
                <div class="datepicker-header-label-time" *ngIf="config.mode == 'time' || config.mode == 'datetime'" [style.paddingTop.px]="config.mode == 'datetime' ? 29 : 0">\r
                    <button (click)="config.view='timepicker';config.timepicker='hour'" class="{{config.view == 'timepicker' && config.timepicker == 'hour' ? 'active' : ''}}">{{getFormated('hh')}}</button>\r
                    <span>:</span>\r
                    <button (click)="config.view='timepicker';config.timepicker='minute'" class="{{config.view == 'timepicker' && config.timepicker == 'minute'? 'active' : ''}}">{{getFormated('mm')}}</button>\r
                    <div>\r
                        <button class="{{isCurrent('am','ampm') ? 'active' : ''}}" (click)="setAmPm('AM')">AM</button>\r
                        <button class="{{isCurrent('pm','ampm') ? 'active' : ''}}" (click)="setAmPm('PM')">PM</button>\r
                    </div>\r
                </div>\r
            </div>\r
            <div class="datepicker-header-action" *ngIf="(config.mode == 'date' || config.mode == 'datetime') && config.view == 'datepicker'">\r
                <button (click)="setPrevMonth()"><i class="fa fa-arrow-left"></i></button>\r
                <div>{{getFormated('MMMM DD')}}</div>\r
                <button (click)="setNextMonth()"><i class="fa fa-arrow-right"></i></button>\r
            </div>\r
            <div class="datepicker-header-action" *ngIf="(config.mode == 'date' || config.mode == 'datetime' || config.mode == 'year') && config.view == 'yearpicker'">\r
                <button (click)="setPrevYearRange()"><i class="fa fa-arrow-left"></i></button>\r
                <div>{{config.startYear - 8}} - {{config.startYear + 7}}</div>\r
                <button (click)="setNextYearRange()"><i class="fa fa-arrow-right"></i></button>\r
            </div>\r
        </div>\r
        <div class="datepicker-body">\r
            <div class="datepicker-datepicker" *ngIf="config.view == 'datepicker' && (config.mode == 'date' || config.mode == 'datetime')">\r
                <ul class="datepicker-weeks">\r
                    <li *ngFor="let week of config.weeks">\r
                        <span>{{limitChar(week,3)}}</span>\r
                    </li>\r
                </ul>\r
\r
                <ul class="datepicker-dates">\r
                    <li *ngFor="let d of getPrefixDays()">\r
                        <span></span>\r
                    </li>\r
                    <li *ngFor="let d of getDatesInMonthArray();trackBy:trackBy" class="{{isCurrent(d.formated,'date') ? 'active' : ''}}" (click)="setDate(d.date)">\r
                        <span>{{d.date}}</span>\r
                    </li>\r
                </ul>\r
            </div>\r
            <div class="picker" *ngIf="config.view == 'timepicker'">\r
                <span *ngIf="config.timepicker == 'hour'">Select Hour</span>\r
                <ul class="picker-col-3" *ngIf="config.timepicker == 'hour'">\r
                    <li *ngFor="let n of getArrayOf(12);let h = index">\r
                        <button class="{{isCurrent(h+1,'hour') ? 'active' : ''}}" (click)="setHour(h+1);config.timepicker = 'minute'">{{h+1}}</button>\r
                    </li>\r
                </ul>\r
                <span *ngIf="config.timepicker == 'minute'">Select minute</span>\r
                <ul class="picker-col-6" *ngIf="config.timepicker == 'minute'">\r
                    <li *ngFor="let n of getArrayOf(60);let m = index">\r
                        <button class="{{isCurrent(m+1,'minute') ? 'active' : ''}}" (click)="setMinute(m+1)">{{m+1}}</button>\r
                    </li>\r
                </ul>\r
            </div>\r
            <div class="picker" *ngIf="config.view == 'monthpicker' || config.mode == 'month'">\r
                <ul class="picker-col-2">\r
                    <li *ngFor="let month of config.months;let m = index">\r
                        <button (click)="setMonth(m);config.view = 'datepicker'" class="{{isCurrent(m+1 + '','month') ? 'active' : ''}}">{{month}}</button>\r
                    </li>\r
                </ul>\r
            </div>\r
            <div class="picker" *ngIf="config.view == 'yearpicker'  || config.mode == 'year'">\r
                <ul class="picker-col-4">\r
                    <li *ngFor="let year of getYearsRange()">\r
                        <button class="{{isCurrent(year,'year') ? 'active' : ''}}" (click)="setYear(year);config.view = config.mode == 'year' ? 'yearpicker' : 'datepicker'">{{year}}</button>\r
                    </li>\r
                </ul>\r
            </div>\r
        </div>\r
        <div class="datepicker-footer">\r
            <button (click)="closeDatePicker()">Cancel</button>\r
            <button (click)="apply()">Apply</button>\r
        </div>\r
    </div>\r
</div>`,
      styles: [".datepicker-overlay{position:fixed;z-index:9999;background:rgba(0,0,0,.1215686275);width:100%;height:100%;left:0;top:0}.datepicker-fixed{width:100%;max-width:300px;z-index:999999;position:fixed}.datepicker-container{box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background-color:#fff;color:#000000de;width:100%}.datepicker-header-label{background:#3f51b5;color:#fff;display:flex;flex-direction:row;justify-content:center;padding:10px}.datepicker-header-action{display:flex;flex-direction:row;align-items:center}.datepicker-header-action>div{flex:1;display:flex;align-items:center;justify-content:center}.datepicker-header-action>button{border:none;background:transparent;height:40px}.datepicker-footer>button{border:none;background:#fff;border-radius:5px;font-size:15px;padding:5px 20px}.datepicker-footer{padding:10px;display:flex;flex-direction:row;width:100%}.datepicker-footer>button:last-child{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;margin-left:auto}ul.datepicker-weeks{list-style:none;padding:10px 0;margin:0;display:flex;flex-direction:row;border-bottom:1px solid #ddd}ul.datepicker-weeks>li{flex:1;display:flex;align-items:center;justify-content:center;font-size:12px}ul.datepicker-dates{padding:0;margin:0;list-style:none;display:block}ul.datepicker-dates>li{width:14.28%;display:inline-block;align-items:center;justify-content:center;font-size:12px;position:relative;padding-top:14.28%;float:left}ul.datepicker-dates>li>span{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer}ul.datepicker-dates>li>span:hover{background:#ddd}ul.datepicker-dates>li.active>span{background:#3f51b5;color:#fff}.datepicker-header-label-date,.datepicker-header-label-time{display:flex}.datepicker-header-label-date{flex-direction:column}.datepicker-header-label-time{flex-direction:row}.datepicker-header-label button{background:transparent;color:#fff;opacity:.5;transition:.5s all ease;border:none}.datepicker-header-label button.active{opacity:1}.datepicker-header-label button:hover{opacity:.8}.datepicker-header-label-date>button{width:100%;text-align:left}.datepicker-header-label-date>button{font-size:18px}.datepicker-header-label-date>div{width:100%;display:flex;flex-direction:row}.datepicker-header-label-date>div>button{font-size:35px;line-height:30px}.datepicker-header-label-time>button{font-size:35px;line-height:30px}.datepicker-header-label-time>span{font-size:30px;line-height:0px;width:5px;justify-content:center;align-items:center;height:100%;display:flex}.datepicker-header-label-time>div{display:flex;flex-direction:column;align-items:center;justify-content:center}.datepicker-header-label-time>div>button{font-size:15px;line-height:15px}.picker>span{font-size:14px;display:block;width:100%;padding:5px}.picker>ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:row;flex-wrap:wrap;max-height:250px;overflow:auto}ul.picker-col-2>li{width:50%}ul.picker-col-3>li{width:33.33%}ul.picker-col-4>li{width:25%}ul.picker-col-6>li{width:16.66%}.picker>ul>li{padding:5px}.picker>ul>li>button{width:100%;border:none;padding:5px;font-size:12px;border-radius:5px;background:rgba(0,0,0,.0392156863)}.picker>ul>li>button:hover{background:#ddd}.picker>ul>li>button.active{background:#3f51b5;color:#fff}\n"]
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    container: [{
      type: ViewChild,
      args: ["container"]
    }],
    element: [{
      type: Input,
      args: ["element"]
    }],
    format: [{
      type: Input,
      args: ["format"]
    }]
  });
})();
var NgxDatepickerDirective = class {
  constructor(cRef, eRef, Service) {
    this.cRef = cRef;
    this.eRef = eRef;
    this.Service = Service;
    this.initiated = false;
    this._value = "";
    this.format = "YYYY-MM-DD";
    this.onChange = (_) => {
    };
    this.onTouched = (_) => {
    };
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
    var inst = this;
    inst.cRef.clear();
    inst.component = this.cRef.createComponent(DatepickerComponent);
    inst.initiated = true;
    inst.component.instance.value = inst.value;
    inst.component.instance.element = this.eRef;
    inst.component.instance.format = inst.format;
    inst.component.instance.config.mode = "date";
    inst.component.instance.onApply = function(value) {
      inst.value = value;
      inst.component.changeDetectorRef.detectChanges();
    };
    inst.component.changeDetectorRef.detectChanges();
  }
  ngOnInit() {
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (typeof value !== "undefined" && value !== null) {
      this._value = value;
      this.onChange(this.value);
      this.onTouched(this.value);
      this.eRef.nativeElement.value = value;
    }
  }
  writeValue(value) {
    if (value !== null) {
      this.value = value;
      if (this.initiated == true) {
        this.component.instance.value = value;
        this.component.changeDetectorRef.detectChanges();
      }
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
};
NgxDatepickerDirective.ɵfac = function NgxDatepickerDirective_Factory(t) {
  return new (t || NgxDatepickerDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxDatepickerService));
};
NgxDatepickerDirective.ɵdir = ɵɵdefineDirective({
  type: NgxDatepickerDirective,
  selectors: [["", "datepicker", ""]],
  inputs: {
    format: "format"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxDatepickerDirective),
    multi: true
  }])]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDatepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[datepicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxDatepickerDirective),
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }, {
      type: ElementRef
    }, {
      type: NgxDatepickerService
    }];
  }, {
    format: [{
      type: Input,
      args: ["format"]
    }]
  });
})();
var NgxDatetimepickerDirective = class {
  constructor(cRef, eRef, Service) {
    this.cRef = cRef;
    this.eRef = eRef;
    this.Service = Service;
    this.initiated = false;
    this._value = "";
    this.format = "YYYY-MM-DD HH:mm:ss";
    this.onChange = (_) => {
    };
    this.onTouched = (_) => {
    };
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
    var inst = this;
    inst.cRef.clear();
    inst.component = this.cRef.createComponent(DatepickerComponent);
    inst.initiated = true;
    inst.component.instance.value = inst.value;
    inst.component.instance.element = this.eRef;
    inst.component.instance.format = inst.format;
    inst.component.instance.config.mode = "datetime";
    inst.component.instance.onApply = function(value) {
      inst.value = value;
      inst.component.changeDetectorRef.detectChanges();
    };
    inst.component.changeDetectorRef.detectChanges();
  }
  ngOnInit() {
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (typeof value !== "undefined" && value !== null) {
      this._value = value;
      this.onChange(this.value);
      this.onTouched(this.value);
      this.eRef.nativeElement.value = value;
    }
  }
  writeValue(value) {
    if (value !== null) {
      this.value = value;
      if (this.initiated == true) {
        this.component.instance.value = value;
        this.component.changeDetectorRef.detectChanges();
      }
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
};
NgxDatetimepickerDirective.ɵfac = function NgxDatetimepickerDirective_Factory(t) {
  return new (t || NgxDatetimepickerDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxDatepickerService));
};
NgxDatetimepickerDirective.ɵdir = ɵɵdefineDirective({
  type: NgxDatetimepickerDirective,
  selectors: [["", "datetimepicker", ""]],
  inputs: {
    format: "format"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxDatetimepickerDirective),
    multi: true
  }])]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDatetimepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[datetimepicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxDatetimepickerDirective),
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }, {
      type: ElementRef
    }, {
      type: NgxDatepickerService
    }];
  }, {
    format: [{
      type: Input,
      args: ["format"]
    }]
  });
})();
var NgxTimepickerDirective = class {
  constructor(cRef, eRef, Service) {
    this.cRef = cRef;
    this.eRef = eRef;
    this.Service = Service;
    this.initiated = false;
    this._value = "";
    this.format = "HH:mm:ss";
    this.onChange = (_) => {
    };
    this.onTouched = (_) => {
    };
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
    var inst = this;
    inst.cRef.clear();
    inst.component = this.cRef.createComponent(DatepickerComponent);
    inst.initiated = true;
    inst.component.instance.value = inst.value;
    inst.component.instance.element = this.eRef;
    inst.component.instance.format = inst.format;
    inst.component.instance.config.mode = "time";
    inst.component.instance.onApply = function(value) {
      inst.value = value;
      inst.component.changeDetectorRef.detectChanges();
    };
    inst.component.changeDetectorRef.detectChanges();
  }
  ngOnInit() {
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (typeof value !== "undefined" && value !== null) {
      this._value = value;
      this.onChange(this.value);
      this.onTouched(this.value);
      this.eRef.nativeElement.value = value;
    }
  }
  writeValue(value) {
    if (value !== null) {
      this.value = value;
      if (this.initiated == true) {
        this.component.instance.value = value;
        this.component.changeDetectorRef.detectChanges();
      }
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
};
NgxTimepickerDirective.ɵfac = function NgxTimepickerDirective_Factory(t) {
  return new (t || NgxTimepickerDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxDatepickerService));
};
NgxTimepickerDirective.ɵdir = ɵɵdefineDirective({
  type: NgxTimepickerDirective,
  selectors: [["", "timepicker", ""]],
  inputs: {
    format: "format"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxTimepickerDirective),
    multi: true
  }])]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTimepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[timepicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxTimepickerDirective),
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }, {
      type: ElementRef
    }, {
      type: NgxDatepickerService
    }];
  }, {
    format: [{
      type: Input,
      args: ["format"]
    }]
  });
})();
var NgxMonthpickerDirective = class {
  constructor(cRef, eRef, Service) {
    this.cRef = cRef;
    this.eRef = eRef;
    this.Service = Service;
    this.initiated = false;
    this._value = "";
    this.format = "MM";
    this.onChange = (_) => {
    };
    this.onTouched = (_) => {
    };
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
    var inst = this;
    inst.cRef.clear();
    inst.component = this.cRef.createComponent(DatepickerComponent);
    inst.initiated = true;
    inst.component.instance.value = inst.value;
    inst.component.instance.element = this.eRef;
    inst.component.instance.format = inst.format;
    inst.component.instance.config.mode = "month";
    inst.component.instance.onApply = function(value) {
      inst.value = value;
      inst.component.changeDetectorRef.detectChanges();
    };
    inst.component.changeDetectorRef.detectChanges();
  }
  ngOnInit() {
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (typeof value !== "undefined" && value !== null) {
      this._value = value;
      this.onChange(this.value);
      this.onTouched(this.value);
      this.eRef.nativeElement.value = value;
    }
  }
  writeValue(value) {
    if (value !== null) {
      this.value = value;
      if (this.initiated == true) {
        this.component.instance.value = value;
        this.component.changeDetectorRef.detectChanges();
      }
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
};
NgxMonthpickerDirective.ɵfac = function NgxMonthpickerDirective_Factory(t) {
  return new (t || NgxMonthpickerDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxDatepickerService));
};
NgxMonthpickerDirective.ɵdir = ɵɵdefineDirective({
  type: NgxMonthpickerDirective,
  selectors: [["", "monthpicker", ""]],
  inputs: {
    format: "format"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxMonthpickerDirective),
    multi: true
  }])]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMonthpickerDirective, [{
    type: Directive,
    args: [{
      selector: "[monthpicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxMonthpickerDirective),
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }, {
      type: ElementRef
    }, {
      type: NgxDatepickerService
    }];
  }, {
    format: [{
      type: Input,
      args: ["format"]
    }]
  });
})();
var NgxYearpickerDirective = class {
  constructor(cRef, eRef, Service) {
    this.cRef = cRef;
    this.eRef = eRef;
    this.Service = Service;
    this.initiated = false;
    this._value = "";
    this.format = "YYYY";
    this.onChange = (_) => {
    };
    this.onTouched = (_) => {
    };
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
    var inst = this;
    inst.cRef.clear();
    inst.component = this.cRef.createComponent(DatepickerComponent);
    inst.initiated = true;
    inst.component.instance.value = inst.value;
    inst.component.instance.element = this.eRef;
    inst.component.instance.format = inst.format;
    inst.component.instance.config.mode = "year";
    inst.component.instance.config.view = "yearpicker";
    inst.component.instance.onApply = function(value) {
      inst.value = value;
      inst.component.changeDetectorRef.detectChanges();
    };
    inst.component.changeDetectorRef.detectChanges();
  }
  ngOnInit() {
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (typeof value !== "undefined" && value !== null) {
      this._value = value;
      this.onChange(this.value);
      this.onTouched(this.value);
      this.eRef.nativeElement.value = value;
    }
  }
  writeValue(value) {
    if (value !== null) {
      this.value = value;
      if (this.initiated == true) {
        this.component.instance.value = value;
        this.component.changeDetectorRef.detectChanges();
      }
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
};
NgxYearpickerDirective.ɵfac = function NgxYearpickerDirective_Factory(t) {
  return new (t || NgxYearpickerDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxDatepickerService));
};
NgxYearpickerDirective.ɵdir = ɵɵdefineDirective({
  type: NgxYearpickerDirective,
  selectors: [["", "yearpicker", ""]],
  inputs: {
    format: "format"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxYearpickerDirective),
    multi: true
  }])]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxYearpickerDirective, [{
    type: Directive,
    args: [{
      selector: "[yearpicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxYearpickerDirective),
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }, {
      type: ElementRef
    }, {
      type: NgxDatepickerService
    }];
  }, {
    format: [{
      type: Input,
      args: ["format"]
    }]
  });
})();
var NgxDatepickerModule = class {
};
NgxDatepickerModule.ɵfac = function NgxDatepickerModule_Factory(t) {
  return new (t || NgxDatepickerModule)();
};
NgxDatepickerModule.ɵmod = ɵɵdefineNgModule({
  type: NgxDatepickerModule,
  declarations: [DatepickerComponent, NgxDatepickerDirective, NgxDatetimepickerDirective, NgxTimepickerDirective, NgxMonthpickerDirective, NgxYearpickerDirective],
  imports: [CommonModule],
  exports: [DatepickerComponent, NgxDatepickerDirective, NgxTimepickerDirective, NgxDatetimepickerDirective, NgxMonthpickerDirective, NgxYearpickerDirective]
});
NgxDatepickerModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDatepickerModule, [{
    type: NgModule,
    args: [{
      declarations: [DatepickerComponent, NgxDatepickerDirective, NgxDatetimepickerDirective, NgxTimepickerDirective, NgxMonthpickerDirective, NgxYearpickerDirective],
      imports: [CommonModule],
      exports: [DatepickerComponent, NgxDatepickerDirective, NgxTimepickerDirective, NgxDatetimepickerDirective, NgxMonthpickerDirective, NgxYearpickerDirective]
    }]
  }], null, null);
})();
export {
  DatepickerComponent,
  NgxDatepickerDirective,
  NgxDatepickerModule,
  NgxDatepickerService,
  NgxDatetimepickerDirective,
  NgxMonthpickerDirective,
  NgxTimepickerDirective,
  NgxYearpickerDirective
};
//# sourceMappingURL=@handylib_ngx-datepicker.js.map
