import{b2 as dt,b3 as X,cd as G,ce as C,d as n,cf as ct,r as E,u as lt,bU as ut,j as I,y as tt,m as et,e as M,n as mt}from"./index-DVYhaN1u.js";import{F as st,i as ft,f as gt}from"./fullcalendar-default-styles-BNVSQj7Z.js";import{a as bt,M as ht}from"./modal-event-info-Dv0dCoBr.js";import{u as yt}from"./use-handle-focus-on-button-V-rGZzuj.js";try{let o=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},c=new o.Error().stack;c&&(o._sentryDebugIds=o._sentryDebugIds||{},o._sentryDebugIds[c]="c50a20cb-a225-4c09-8922-d0c3d476eafb",o._sentryDebugIdIdentifier="sentry-dbid-c50a20cb-a225-4c09-8922-d0c3d476eafb")}catch{}const vt=({classes:o,timezoneOffset:c,userRoles:l})=>{const f=(l==null?void 0:l.length)===1&&l.includes(dt.Student),v=[],S=6,s=o==null?void 0:o.map(t=>{var B,Z,q,V,W,Y,J,K,Q;const h=X.utc(t.from),x=X.utc(t.to),z=h.get("hours"),O=h.get("minutes"),T=x.get("hours"),k=x.get("minutes"),i=h.set("hour",z).set("minute",O).set("second",0).add(c,"minutes"),D=x.set("hour",T).set("minute",k).set("second",0).add(c,"minutes"),w=i.format(G.isoString),at=D.format(G.isoString),F=i.hours(),R=D.hours();let P=F,L=R;F>R&&(P=0),k&&(L+=1),R<F&&(L=24),v.push(P,L);const ot=C({firstName:(B=t==null?void 0:t.teacher)==null?void 0:B.user.firstName,lastName:(Z=t==null?void 0:t.teacher)==null?void 0:Z.user.lastName,middleName:(q=t==null?void 0:t.teacher)==null?void 0:q.user.middleName}),j=(V=t.teachers)!=null&&V.length?t.teachers.map(r=>({value:r.id,label:C({firstName:r==null?void 0:r.user.firstName,lastName:r==null?void 0:r.user.lastName,middleName:r==null?void 0:r.user.middleName})})):null,A=(W=t==null?void 0:t.teacher)==null?void 0:W.id,y=t.flow,U=t.attendance,e=t.discipline,a=e==null?void 0:e.templateDiscipline.disciplinesGroup,d=t.learningGroup,u=t.classroom,m=(Y=t.classroom)==null?void 0:Y.buildingArea,rt=t==null?void 0:t.role,nt=!!t.retakingGroup,it=t!=null&&t.isOnline?n.success200:nt?n.danger200:n.custom100;return{classId:t.id,start:w,end:at,roleInClass:rt,title:t.name,name:t.name,hasErrors:!1,backgroundColor:it,isOnline:t==null?void 0:t.isOnline,meetingLink:t==null?void 0:t.meetingLink,...j&&j.length>0&&{teachers:j},...(a==null?void 0:a.id)&&{groupOfDisciplines:{value:a==null?void 0:a.id,label:a==null?void 0:a.name}},topics:(J=t==null?void 0:t.ctpTopics)==null?void 0:J.map(r=>({value:r.id,label:r.name})),...(a==null?void 0:a.id)&&{groupOfDisciplines:{value:a==null?void 0:a.id,label:a==null?void 0:a.name}},...(e==null?void 0:e.id)&&{discipline:{value:e==null?void 0:e.id,label:f?e==null?void 0:e.name:ct(e==null?void 0:e.name,e==null?void 0:e.code),organizationId:(K=e==null?void 0:e.suborganization)==null?void 0:K.organizationId,suborganizationId:(Q=e==null?void 0:e.suborganization)==null?void 0:Q.id}},...(m==null?void 0:m.id)&&{buildingArea:{value:m==null?void 0:m.id,label:m==null?void 0:m.name}},...(u==null?void 0:u.id)&&{classroom:{value:u==null?void 0:u.id,label:u==null?void 0:u.name}},...A&&{teacher:{value:A,label:ot}},...(y==null?void 0:y.id)&&{stream:{value:y.id,label:y.name,learningGroups:y.learningGroups}},...U&&{attendance:U},...(d==null?void 0:d.id)&&{learningGroup:{value:d==null?void 0:d.id,label:d==null?void 0:d.name,isArchived:d.isArchived}}}}),N=(s==null?void 0:s.length)>0,b=Math.min(...v),g=Math.max(...v),p=g-b,_=p>=S,H=S-p,$={slotMinTime:`${String(b).padStart(2,"0")}:00:00`,slotMaxTime:`${String(_?g:g+H).padStart(2,"0")}:00:00`};return{events:s,hasEvents:N,slotTimeInterval:$}},pt=o=>{E.useEffect(()=>{var l;const c=document.querySelector(".header-timezone");if(o&&!c){const f=document.createElement("p");f.classList.add("header-timezone"),f.innerText=o,(l=document.querySelector(".fc-toolbar-chunk"))==null||l.append(f)}},[])},Mt=({classes:o=[],timezoneTitle:c,defaultDate:l,timezoneOffset:f=0,userRoles:v,onChangeRange:S})=>{const{t:s,i18n:N}=lt(["common","schedule"]),{isStudent:b,isTeacher:g,isParent:p}=ut(),_=E.useRef(null),[H,$]=E.useState(),[t,h]=E.useState(!1),{events:x,hasEvents:z,slotTimeInterval:O}=vt({classes:o,timezoneOffset:f,userRoles:v}),T=z?O:{slotMinTime:"07:00:00",slotMaxTime:"22:00:00"};yt(),pt(c);const k=({view:i})=>{const D=i.activeStart,w=i.activeEnd;D&&w&&(S(i),et({goalName:"DashboardSchedule",additionalParams:{isStudent:b,isTeacher:g},isDisabled:p}))};return I.jsxs(xt,{children:[I.jsx(st,{ref:_,plugins:[ft],eventContent:i=>I.jsx(bt,{isAdmin:!0,eventInfo:i}),eventDisplay:"block",height:"660px",headerToolbar:{left:"title",center:"",right:"prev,next"},titleFormat:{month:"long",year:"numeric",day:"numeric"},timeZone:"UTC",initialView:"timeGridDay",initialDate:l,events:x,locale:N.language,dayHeaderFormat:{day:"2-digit",month:"2-digit",weekday:"short"},slotDuration:"00:15:00",snapDuration:"00:05:00",slotMinTime:T.slotMinTime,slotMaxTime:T.slotMaxTime,scrollTimeReset:!1,eventStartEditable:!0,stickyHeaderDates:!0,eventDurationEditable:!0,eventBackgroundColor:n.custom100,eventBorderColor:"transparent",selectLongPressDelay:100,firstDay:1,dayMaxEvents:4,eventMaxStack:4,allDaySlot:!1,views:{timeGridDay:{buttonText:s("day",{ns:"schedule"}),allDayText:s("allDay",{ns:"schedule"}),slotLabelFormat:{hour:"2-digit",minute:"2-digit",omitZeroMinute:!1},eventTimeFormat:{hour:"2-digit",minute:"2-digit",omitZeroMinute:!1}}},eventClick:i=>{$(i),h(!0),b&&tt("student-dashboard-event-click"),g&&tt("teacher-dashboard-event-click"),et({goalName:"DashboardSchedule",additionalParams:{isStudent:b,isTeacher:g},isDisabled:p})},datesSet:k}),t&&I.jsx(ht,{selectedEvent:H,title:s("detailedInfo",{ns:"common"}),onClose:()=>h(!1),durationInWeeks:2})]})},xt=mt.div`
  ${gt}

  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0;
    position: relative;
  }

  .fc-header-toolbar {
    padding: 20px 20px 24px;
  }

  .fc-scrollgrid-section-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 50;
  }

  .fc-timegrid-slots {
    z-index: initial;
  }

  .fc-timegrid-slot-label,
  .fc-scrollgrid-shrink {
    position: sticky;
    display: block;
    left: 0;
    background: white;
    z-index: 50;
    box-sizing: content-box;
    pointer-events: none;
    border: 1px solid ${n.grayscale300};
    border-bottom: none;
    transform: translate(0px, -0.5px);
  }

  .fc-scrollgrid tbody[role='rowgroup'] > tr:last-child td[role='presentation'] {
    border: 0;
  }

  .fc .fc-daygrid-day.fc-day-today,
  .fc .fc-timegrid-col.fc-day-today {
    background-color: transparent;
  }

  .fc-timegrid-axis-frame {
    color: ${n.grayscale500};
    ${M.desktop_regular_body};
  }

  .fc-toolbar-title {
    ${M.desktop_regular_h3};
  }

  .fc-button-group .fc-button,
  .fc-button-group .fc-button-active {
    ${M.desktop_medium_label};
    padding: 6px 12px;
    box-shadow: none !important;
    border: 0;
  }

  .fc-button-group .fc-button {
    background-color: ${n.grayscale200};
    color: ${n.grayscale700};
  }

  .fc-button-group > .fc-button.fc-button-active {
    background: ${n.primary200};
    color: ${n.primary400};
  }

  .fc-next-button.fc-button-primary:focus,
  .fc-prev-button.fc-button-primary:focus {
    background-color: ${n.grayscale200};
  }

  .header-timezone {
    ${M.desktop_regular_body};
    color: ${n.grayscale500};
    margin-left: 20px;
    line-height: 30px;
  }
`;export{Mt as default};
