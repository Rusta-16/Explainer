import{H as fa,b3 as q,bC as ua,j as i,dh as ba,dn as ga,d as $,e as G,n as o,t as wa,u as ya,bq as ka,ad as ja,b7 as $a,em as La,b2 as T,b1 as Ma,r as _,en as Pa,ce as pa,bP as Fa,dg as Na,eo as _a,cx as Ca,di as Aa,ep as Ba,bn as Oa,bo as Da,db as Ha,eq as Ga,er as Wa,es as Ya}from"./index-DVYhaN1u.js";try{let t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},m=new t.Error().stack;m&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[m]="bc0fd5bb-910f-40e9-95f4-dd670f685e53",t._sentryDebugIdIdentifier="sentry-dbid-bc0fd5bb-910f-40e9-95f4-dd670f685e53")}catch{}const rt=({eventInfo:t,onErrorClick:m,isAdmin:w})=>{var f,B,R;const h=(f=t==null?void 0:t.event)==null?void 0:f.extendedProps,{filters:y}=fa(),r=t.view.type!=="dayGridMonth",{name:g,teachers:s,learningGroup:c,buildingArea:u,classroom:n,discipline:x,isLessThanTwoEventsPerDay:L,retakingGroup:a,showTime:S,suborganization:d,stream:b}=h||{},l=q.utc((B=t==null?void 0:t.event)==null?void 0:B.start).format("HH:mm"),F=q.utc((R=t==null?void 0:t.event)==null?void 0:R.end).format("HH:mm"),e=`${l}-${F}`,W=[g,x==null?void 0:x.label,e,s==null?void 0:s.map(j=>j==null?void 0:j.label).join(", "),c==null?void 0:c.label,a==null?void 0:a.label,u==null?void 0:u.label,...n!=null&&n.label?[`ауд. ${n==null?void 0:n.label}`]:[],b==null?void 0:b.label,...w?[d==null?void 0:d.label]:[]].filter(j=>j).join(", "),C=()=>{if(!(!s||!s.length))return s.length>1?`${s[0].label} +${s.length-1}`:s[0].label},Y=C(),N=w?h==null?void 0:h.hasErrors:!1,A=j=>{j.stopPropagation(),m==null||m()};let M;switch(y.scenario){case ua.GROUP:M=c==null?void 0:c.label;break;case ua.CLASSROOM:M=n==null?void 0:n.label;break;default:M=C()}const z=g||(x==null?void 0:x.label)||M;return i.jsx(za,{$hasErrors:N||!1,children:i.jsx(ba,{title:i.jsx(Qa,{children:W}),placement:"top-end",children:i.jsxs(i.Fragment,{children:[i.jsx(Ra,{children:z}),S&&i.jsx(Ua,{children:e}),(r||L)&&i.jsxs(i.Fragment,{children:[g&&i.jsx(P,{children:x==null?void 0:x.label}),i.jsx(P,{children:Y}),i.jsx(P,{children:b==null?void 0:b.label}),i.jsx(P,{children:(c==null?void 0:c.label)||(a==null?void 0:a.label)}),i.jsx(P,{children:u==null?void 0:u.label}),(n==null?void 0:n.label)&&i.jsx(P,{children:`Ауд. ${n==null?void 0:n.label}`}),w&&i.jsx(Va,{children:d==null?void 0:d.label})]}),N&&i.jsx(qa,{onClick:A,children:i.jsx(ga,{stroke:$.warning500})})]})})})},za=o("div",wa)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-wrap: wrap;
  margin: 8px 8px 4px;
  padding-bottom: ${({$hasErrors:t})=>t?"16px":"0px"};
  text-transform: initial;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  color: ${$.grayscale700};
  ${G.mobile_regular_caption};

  & div {
    width: 100%;
  }
`,Ra=o.div`
  font-weight: 700;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`,Ua=o.p`
  ${G.desktop_regular_caption};
`,P=o.div`
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`,Va=o.div`
  white-space: nowrap;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
`,qa=o.button`
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;

  svg {
    width: 12px;
    height: 12px;
    transition: scale 0.2s;
  }

  &:hover {
    svg {
      width: 12px;
      height: 12px;
      transform: scale(1.1);
    }
  }
`,Qa=o.div`
  padding: 4px 8px;
`,Ja=({errors:t,className:m})=>{const{t:w}=ya(["common"]),h=!!(t!=null&&t.length),y=(t==null?void 0:t.length)===1,r=(t==null?void 0:t.length)??0;return h?i.jsx(Ka,{className:m,children:y?i.jsx(ma,{children:t==null?void 0:t[0]}):i.jsx(Ia,{title:i.jsx(Za,{children:t==null?void 0:t.map((g,s)=>i.jsx("div",{children:g},s))}),children:i.jsxs(va,{children:[i.jsx(ma,{children:ka(r,w("singularPlural.warning",{ns:"common",count:r}))}),i.jsx(Xa,{stroke:$.warning500})]})})}):null},Ka=o.div`
  position: relative;
`,Xa=o(ga)`
  width: 16px;
  height: 16px;
  margin-left: 6px;
  transition: all 0.2s;
`,Za=o.div`
  padding: 12px;
`,va=o.div`
  display: flex;
  cursor: pointer;

  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`,ma=o.p`
  ${G.desktop_regular_caption}
  color: ${$.warning600};
`,Ia=o(ba)`
  .MuiTooltip-tooltip {
    max-width: 412px;
  }
`,Ea=t=>{const{profileId:m}=ja(),w=t.roleInClass,{data:h}=$a({fetchPolicy:"cache-first"}),{profileData:y}=La(m),r=m?y==null?void 0:y.getUserById:h==null?void 0:h.getMe,g=w===T.StudentParent,s=w===T.Student,c=g?Ma():r==null?void 0:r.id,[u,n]=_.useState(null),[x,L]=_.useState(""),[a,{data:S}]=Pa();return _.useEffect(()=>{var b,l;const d=(l=(b=S==null?void 0:S.getClassById)==null?void 0:b.attendance)==null?void 0:l.find(F=>F.studentId===c);d&&n(d)},[S]),_.useEffect(()=>{if(g||s){if(g&&(r!=null&&r.children.length)){for(const{student:d}of r.children)if(d.id===c){const b=pa({...d.user});L(b)}}if(s){const d=pa({...r});L(d)}a({variables:{classId:t.classId,studentId:c}})}},[h]),{student:u,studentName:x,studentId:c}},ct=({selectedEvent:t,className:m,icon:w,title:h,subTitle:y,onClose:r,onlyWeekDay:g=!1})=>{var J,K,X,Z,v,I,E,aa,ta,ia,na,sa,la,ea,oa;const{t:s,i18n:c}=ya(["common","inputLabels","schedule","disciplines","topics"]),{data:u}=$a({fetchPolicy:"cache-first"}),n=u==null?void 0:u.getMe.roles,{profileId:x}=ja(),L=!!x,a=t==null?void 0:t.event.extendedProps,{userId:S}=Fa(),d=t!=null&&t.event.start?q.utc(t==null?void 0:t.event.start).locale(c.language).format("DD.MM.YYYY"):"",b=Na(a.weekDay)?(a.weekDay%7).toString():"",l=a.errors,F=(a==null?void 0:a.name)!==((J=a==null?void 0:a.discipline)==null?void 0:J.label),{student:e,studentName:Q,studentId:W}=Ea(a),C=e==null?void 0:e.studentFormEducation,Y=(K=a==null?void 0:a.stream)==null?void 0:K.learningGroups.map(p=>p.name).join(", "),N=(n==null?void 0:n.some(p=>p.includes("ADMIN")))||(u==null?void 0:u.getMe.isSuperAdmin),A=n==null?void 0:n.includes(T.Teacher),M=n==null?void 0:n.includes(T.Curator),z=n==null?void 0:n.includes(T.Student),f=n==null?void 0:n.includes(T.StudentParent),B=(n==null?void 0:n.includes(T.StudentParent))||(n==null?void 0:n.includes(T.Student));a==null||a.teachers;const j=(()=>{var p;return L?N?!0:A?(p=a==null?void 0:a.teachers)==null?void 0:p.map(k=>k.value).includes(S||""):M?!1:!f:!f})(),Sa=[...g?[{label:`${s("days",{ns:"inputLabels"})}:`,value:s(`fullWeekdays.${_a[b]}`,{ns:"common"}),errors:l==null?void 0:l.classCount}]:[{label:`${s("date",{ns:"inputLabels"})}:`,value:d,errors:l==null?void 0:l.classCount}]],U=[{label:`${s("name",{ns:"common"})}:`,value:a==null?void 0:a.name},...F?[{label:`${s("entitiesNames.discipline",{ns:"common"})}:`,value:(X=a==null?void 0:a.discipline)==null?void 0:X.label,errors:l==null?void 0:l.discipline}]:[],...f?[]:((a==null?void 0:a.topics)||[]).map((p,k)=>{var ra,ca,da;const O=p.value,V=(ra=a.discipline)==null?void 0:ra.value,D=(ca=a==null?void 0:a.discipline)==null?void 0:ca.organizationId,H=(da=a==null?void 0:a.discipline)==null?void 0:da.suborganizationId,Ta=Ba({organizationId:D,suborganizationId:H,disciplineId:V,topicId:O,isStudent:z,isTeacher:A,isAdmin:N});return{label:k===0?`${s("topic",{ns:"topics"})}:`:"",value:p.label,link:Ta}}),...Sa,{label:`${s("time",{ns:"common"})}:`,value:Ca(t==null?void 0:t.event.start,t==null?void 0:t.event.end),errors:l==null?void 0:l.classTime},{label:`${s("entitiesNames.buildingArea",{ns:"common"})}:`,value:(Z=a==null?void 0:a.buildingArea)==null?void 0:Z.label,errors:l==null?void 0:l.buildingArea},{label:`${s("entitiesNames.classroom",{ns:"common"})}:`,value:(v=a==null?void 0:a.classroom)==null?void 0:v.label,errors:l==null?void 0:l.classroom},{label:((a==null?void 0:a.teachers)||[]).length>1?`${s("teachers",{ns:"inputLabels"})}:`:`${s("teacher",{ns:"inputLabels"})}:`,value:(I=a==null?void 0:a.teachers)==null?void 0:I.map(p=>p.label).join(", "),errors:l==null?void 0:l.teacher},{label:`${s("stream",{ns:"inputLabels"})}:`,value:(E=a.stream)==null?void 0:E.label},{label:`${s("streamsGroups",{ns:"streams"})}:`,value:Y},...B?[...f?[{label:`${s("student",{ns:"inputLabels"})}:`,value:Q,errors:l==null?void 0:l.learningGroup}]:[],...e!=null&&e.status?[{label:`${s("attendanceMark",{ns:"schedule"})}:`,value:Aa({status:e.status,reason:e==null?void 0:e.reason,educationForms:(ta=(aa=e.student)==null?void 0:aa.formsEducation)==null?void 0:ta.currentForm_V2,classDate:(ia=t==null?void 0:t.event.start)==null?void 0:ia.toISOString(),studentId:W,studentAttendanceForms:C,mainEducationForm:(na=e.student)==null?void 0:na.mainFormsEducation.currentForm})}]:[],...e!=null&&e.reason?[{label:`${s("reason",{ns:"disciplines"})}:`,value:s(e.reason,{ns:"schedule"})}]:[],...e!=null&&e.comment?[{label:`${s("comment",{ns:"common"})}:`,value:e.comment}]:[]]:[],{label:`${s("entitiesNames.groupSubgroup",{ns:"common"})}:`,value:(sa=a==null?void 0:a.learningGroup)==null?void 0:sa.label,isArchived:!!((la=a==null?void 0:a.learningGroup)!=null&&la.isArchived),errors:l==null?void 0:l.learningGroup},...(ea=a==null?void 0:a.retakingGroup)!=null&&ea.label?[{label:`${s("entitiesNames.group",{ns:"common"})}:`,value:(oa=a==null?void 0:a.retakingGroup)==null?void 0:oa.label}]:[],...j?[{label:`${s("linkToMeeting",{ns:"schedule"})}:`,value:a==null?void 0:a.meetingLink,link:a==null?void 0:a.meetingLink}]:[]];return i.jsxs(tt,{onClose:r,className:m,children:[i.jsx(it,{title:h,subTitle:y,icon:w,onClose:r}),i.jsxs(nt,{children:[a.isOnline&&i.jsx(at,{variant:"success",size:"s",text:s("onlineLesson",{ns:"schedule"})}),U==null?void 0:U.map(({label:p,value:k,isArchived:O,errors:V,link:D},H)=>k?D?i.jsxs(ha,{children:[i.jsx(xa,{className:"modal-info-item__label",children:p}),i.jsx(lt,{isRouterLink:!1,to:D,text:k,rightContent:i.jsx(et,{}),target:"_blank"})]},H):i.jsx(_.Fragment,{children:i.jsxs(ha,{children:[i.jsx(xa,{className:"modal-info-item__label",children:p}),i.jsxs("div",{children:[i.jsxs(st,{$isArchived:!!O,children:[k,`${O?` (${s("archivalShort",{ns:"archive"})})`:""}`]}),i.jsx(Ja,{errors:V})]})]})},H):null)]})]})},at=o(Ha)`
  margin-bottom: 8px;
`,tt=o(Oa)`
  max-width: 640px;
`,it=o(Da)`
  min-height: auto;
  border-bottom: 1px solid ${$.grayscale300};
  padding: 19px 24px;

  svg {
    width: 32px;
    height: 32px;
  }
`,nt=o.ul`
  ${G.desktop_medium_body};
  color: ${$.grayscale600};
  padding: 16px 24px;
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
  white-space: pre-line;
`,ha=o.li`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;

  @media ${Ga.tablet} {
    flex-wrap: nowrap;
    margin-bottom: 6px;
  }
`,xa=o.div`
  color: ${$.grayscale600};
  max-width: 204px;
  width: 100%;
  flex-shrink: 0;
  margin-right: 16px;
  word-break: break-word;
`,st=o("div",wa)`
  color: ${({$isArchived:t})=>t?$.grayscale600:$.grayscale700};
  word-break: break-word;

  & > div:not(div:first-child) {
    margin-top: 8px;
  }
`,lt=o(Wa)`
  max-width: 100%;
  overflow: hidden;
`,et=o(Ya)`
  max-width: 20px !important;
  max-height: 20px !important;
`;export{Ja as E,ct as M,rt as a};
