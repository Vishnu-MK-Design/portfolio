                                                 
                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                 
export const KEY='schoolhouse-demo-v1';
export const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export const shift=(date       ,n       )=>new Date(Date.parse(date+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
export const uid=()=>crypto.randomUUID();
export const weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday'];
export const periodTimes=['09:00','09:50','10:50','11:40','13:20','14:10'];
export const weekStart=(date       )=>shift(date,-((new Date(date+'T12:00:00Z').getUTCDay()+6)%7));
export function subjectTone(subject       ){
 const key=subject.trim().toLowerCase();
 if(key==='mathematics')return 0;if(key==='english')return 1;if(key==='science')return 2;
 return Array.from(key).reduce((n,c)=>(n*31+c.codePointAt(0) )%3,0);
}
export function lessonsOn(s      ,classId       ,date       ){
 if(!isSchoolDay(s,date))return [];
 const day=weekdays[new Date(date+'T12:00:00Z').getUTCDay()-1];
 return s.slots.filter(x=>x.classId===classId&&x.day===day&&s.allocations.some(a=>a.classId===classId&&a.teacherId===x.teacherId&&a.subject===x.subject&&a.start<=date&&date<=a.end)).sort((a,b)=>a.period-b.period);
}
export function seed(now=today())      {
 const y=Number(now.slice(0,4))-(Number(now.slice(5,7))<4?1:0),start=`${y}-04-01`,end=`${y+1}-03-31`;
 const classes=Array.from({length:24},(_,i)=>({id:`c${i}`,grade:String(Math.floor(i/2)+1),section:i%2?'B':'A',archived:false}));
 const names=['Aarav Mehta','Diya Nair','Kabir Shah','Mira Rao','Ishaan Sen','Anaya Das','Vihaan Roy','Tara Menon'];
 const students=classes.flatMap((c,i)=>names.map((name,j)=>({id:`s${i}-${j}`,name,code:`SH${String(i*8+j+1).padStart(3,'0')}`,archived:false,enrollments:[{classId:c.id,start,end:''}]})));
 const teachers=['Priya Raman','Arjun Menon','Neha Kapoor','Rohan Das','Meera Iyer','Dev Shah','Sara Khan','Aditya Rao'].map((name,i)=>({id:`t${i}`,name}));
 const allocations=classes.flatMap((c,i)=>['Mathematics','English','Science'].map((subject,j)=>({id:`a${i}-${j}`,classId:c.id,teacherId:`t${(i*3+j)%8}`,subject,start,end}))); 
 const s      ={version:1,revision:0,school:{name:'Maplewood School',start,end,closed:false,holidays:[],working:[]},classes,students,teachers,allocations,attendance:[],slots:[],invoices:[],payments:[],messages:[],assessments:[],activity:[]};
 s.invoices=students.map(st=>({id:uid(),classId:st.enrollments[0].classId,studentId:st.id,title:'Term 1 tuition',amount:12500,due:shift(now,14)}));
 s.payments=s.invoices.filter((_,i)=>i%3!==0).map((inv,i)=>({id:uid(),invoiceId:inv.id,amount:i%2?12500:6000,date:now,voided:false,reason:''}));
 const samplePeriods=[[1,2,3],[1,3,4],[2,3,5],[1,2,4],[2,4,6]],classAllocations=allocations.filter(a=>a.classId==='c10');
 for(let day=0;day<5;day++)for(let p=0;p<3;p++){const a=classAllocations[(p+day)%3];s.slots.push({id:uid(),classId:'c10',teacherId:a.teacherId,subject:a.subject,day:weekdays[day],period:samplePeriods[day][p],room:a.subject==='Science'&&day%2?'Science Lab':'Room 204'});}
 s.messages=[{id:uid(),classId:'c10',studentId:'',title:'A new term, a fresh start',body:'Welcome to the new term. Please help your child bring their reading journal each day.',status:'Simulated sent',recipients:roster(s,'c10',now).map(x=>x.id),acknowledged:false,date:now}];
 s.assessments=[{id:uid(),classId:'c10',subject:'Mathematics',title:'Number sense · quiz 1',max:20,date:now,scores:Object.fromEntries(roster(s,'c10',now).map((st,i)=>[st.id,12+i]))}];
 addSampleActivity(s,now);
 return s;
}
// Explicit, additive fixture loading. Never fill custom classes or overwrite a saved record.
export function addSampleActivity(s      ,now=today())       {
 if(s.school.closed)throw Error('Reopen the academic year before adding sample activity.');
 const names=['Aarav Mehta','Diya Nair','Kabir Shah','Mira Rao','Ishaan Sen','Anaya Das','Vihaan Roy','Tara Menon'];
 const sampleClasses=s.classes.filter(c=>{
  const i=Number(c.id.slice(1));
  return /^c\d+$/.test(c.id)&&i<24&&!c.archived&&c.grade===String(Math.floor(i/2)+1)&&c.section===(i%2?'B':'A')&&roster(s,c.id,now).length===8&&names.every((name,j)=>{
   const st=s.students.find(x=>x.id===`s${i}-${j}`);
   return st&&!st.archived&&st.name===name&&st.code===`SH${String(i*8+j+1).padStart(3,'0')}`&&st.enrollments.length===1&&st.enrollments[0].classId===c.id&&st.enrollments[0].start===s.school.start&&!st.enrollments[0].end;
  });
 });
 let added=0;
 const dates=Array.from({length:29},(_,i)=>shift(now,-i-1)).filter(d=>isSchoolDay(s,d));
 for(const c of sampleClasses){
  const classIndex=Number(c.id.slice(1));
  for(const date of dates){
   if(s.attendance.some(a=>a.id===`sample-att-${c.id}-${date}`||(a.classId===c.id&&a.date===date)))continue;
   const dayIndex=Math.floor(Date.parse(date+'T12:00:00Z')/86400000);
   const entries=Object.fromEntries(roster(s,c.id,date).map((st,i)=>{
    const pattern=(dayIndex+classIndex*3+i*7)%19;
    return [st.id,pattern===0||pattern===4?'absent':pattern===8?'late':'present'];
   }));
   s.attendance.push({id:`sample-att-${c.id}-${date}`,classId:c.id,date,status:'submitted',entries,audit:[],savedAt:date+'T03:30:00Z'});added++;
  }
  // A class with an existing timetable keeps it exactly as entered.
  if(!s.slots.some(slot=>slot.classId===c.id)){
   const allocations=s.allocations.filter(a=>a.classId===c.id&&a.start<=now&&now<=a.end&&s.teachers.some(t=>t.id===a.teacherId));
   for(let d=0;d<weekdays.length;d++)for(let lesson=0;lesson<Math.min(2,allocations.length);lesson++){
    const a=allocations[(d+lesson)%allocations.length],day=weekdays[d];
    const period=Array.from({length:6},(_,i)=>(classIndex*2+lesson+i)%6+1).find(p=>!s.slots.some(slot=>slot.day===day&&slot.period===p&&(slot.classId===c.id||slot.teacherId===a.teacherId)));
    if(!period)continue;
    s.slots.push({id:`sample-slot-${c.id}-${d}-${lesson}`,classId:c.id,teacherId:a.teacherId,subject:a.subject,day,period,room:`Room ${201+classIndex}`});added++;
   }
  }
  if(!dates.length)continue;
  const updates=[['Reading journal reminder','Please bring the reading journal for our next English lesson.','Simulated sent'],['Science learning update','This week we are exploring plants. Ask your child to describe what they observed in class.','Simulated sent'],['Weekly class notes','Our class has been practising number patterns and independent reading. This update is ready for review.','Draft']];
  updates.forEach(([title,body,status],i)=>{
   const date=dates[Math.min(i*2,dates.length-1)];
   if(s.messages.some(m=>m.id===`sample-message-${c.id}-${i}-${date}`||(m.classId===c.id&&m.title===title&&m.date===date)))return;
   s.messages.push({id:`sample-message-${c.id}-${i}-${date}`,classId:c.id,studentId:'',title,body,status,recipients:roster(s,c.id,date).map(st=>st.id),acknowledged:i===0,date});added++;
  });
  ['Mathematics','English','Science'].forEach((subject,i)=>{
   const date=dates[Math.min(3+i*2,dates.length-1)],title=`${subject} · classroom check`;
   if(s.assessments.some(a=>a.id===`sample-assessment-${c.id}-${i}-${date}`||(a.classId===c.id&&a.title===title&&a.date===date)))return;
   s.assessments.push({id:`sample-assessment-${c.id}-${i}-${date}`,classId:c.id,subject,title,max:20,date,scores:Object.fromEntries(roster(s,c.id,date).map((st,j)=>[st.id,12+(classIndex+i+j)%9]))});added++;
  });
 }
 if(sampleClasses.length&&dates.length){
  const latest=dates[0];
  const examples=[['register','Sample · Recent class registers recorded'],['updates','Sample · Reading journal reminders prepared'],['assessment','Sample · Classroom checks recorded']];
  examples.forEach(([kind,text],i)=>{const id=`sample-activity-${kind}-${latest}`;if(s.activity.some(a=>a.id===id))return;s.activity.push({id,text,at:latest+`T0${3+i}:30:00Z`});added++;});
  s.activity.sort((a,b)=>b.at.localeCompare(a.at));
 }
 return added;
}
export function validate(s    )           {
 if(!s||s.version!==1||!Number.isInteger(s.revision)||!s.school||typeof s.school.name!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s.school.start)||!/^\d{4}-\d{2}-\d{2}$/.test(s.school.end)||typeof s.school.closed!=='boolean'||!Array.isArray(s.school.holidays)||!Array.isArray(s.school.working))return false;
 for(const key of ['classes','students','teachers','allocations','attendance','slots','invoices','payments','messages','assessments','activity'])if(!Array.isArray(s[key])||s[key].some(x=>!x||typeof x.id!=='string'))return false;
 const cs=new Set(s.classes.map(x=>x.id)),ss=new Set(s.students.map(x=>x.id)),ts=new Set(s.teachers.map(x=>x.id)),ins=new Set(s.invoices.map(x=>x.id));
 for(const key of ['classes','students','teachers','allocations','attendance','slots','invoices','payments','messages','assessments','activity'])if(new Set(s[key].map(x=>x.id)).size!==s[key].length)return false;
 if(s.students.some(x=>!Array.isArray(x.enrollments)||x.enrollments.some(e=>!e||!cs.has(e.classId))))return false;
 if(s.allocations.some(x=>!cs.has(x.classId)||!ts.has(x.teacherId)))return false;
 if(s.attendance.some(x=>!cs.has(x.classId)||typeof x.date!=='string'||!['draft','submitted'].includes(x.status)||!x.entries||typeof x.entries!=='object'||Array.isArray(x.entries)||Object.entries(x.entries).some(([id,v])=>!ss.has(id)||!['','present','absent','late'].includes(v          ))||!Array.isArray(x.audit)||x.audit.some(a=>!a||typeof a.reason!=='string'||!Array.isArray(a.changes)||a.changes.some(c=>!c||!ss.has(c.studentId)))))return false;
 if(s.slots.some(x=>!cs.has(x.classId)||!ts.has(x.teacherId)||!weekdays.includes(x.day)||!Number.isInteger(x.period)||x.period<1||x.period>6||typeof x.subject!=='string'||typeof x.room!=='string'))return false;
 if(s.invoices.some(x=>!ss.has(x.studentId)||typeof x.title!=='string'||typeof x.due!=='string')||s.payments.some(x=>!ins.has(x.invoiceId)||typeof x.date!=='string'||typeof x.voided!=='boolean'))return false;
 if(s.messages.some(x=>!cs.has(x.classId)||typeof x.title!=='string'||typeof x.date!=='string'||!['Draft','Simulated sent'].includes(x.status)||!Array.isArray(x.recipients)||x.recipients.some(id=>!ss.has(id))))return false;
 if(s.assessments.some(x=>!cs.has(x.classId)||typeof x.title!=='string'||typeof x.subject!=='string'||!x.scores||Object.entries(x.scores).some(([id,v])=>!ss.has(id)||(v!==null&&(!Number.isFinite(v)||(v          )<0||(v          )>x.max)))))return false;
 return s.classes.every(x=>typeof x.grade==='string'&&typeof x.section==='string')&&s.students.every(x=>typeof x.name==='string'&&typeof x.code==='string'&&Array.isArray(x.enrollments)&&x.enrollments.every(e=>typeof e.classId==='string'&&typeof e.start==='string'&&typeof e.end==='string'))&&s.teachers.every(x=>typeof x.name==='string')&&s.allocations.every(x=>typeof x.classId==='string'&&typeof x.teacherId==='string'&&typeof x.subject==='string'&&typeof x.start==='string'&&typeof x.end==='string')&&s.attendance.every(x=>x.entries&&typeof x.entries==='object'&&Array.isArray(x.audit))&&s.assessments.every(x=>x.scores&&typeof x.scores==='object'&&Number.isFinite(x.max)&&x.max>0)&&s.messages.every(x=>typeof x.body==='string'&&Array.isArray(x.recipients))&&s.invoices.every(x=>Number.isFinite(x.amount)&&x.amount>0)&&s.payments.every(x=>Number.isFinite(x.amount)&&x.amount>0);
}
export function load(storage    )       {const raw=storage.getItem(KEY);if(!raw)return seed();const data=JSON.parse(raw);if(!validate(data))throw Error('Saved data is damaged or from an unsupported version. Reset the sample data to start again.');return data;}
export function persist(storage    ,next      ,previousRevision       ){const raw=storage.getItem(KEY);if(!raw&&previousRevision>0)throw Error('Saved data was cleared. Reload before saving.');if(raw){const existing=JSON.parse(raw);if(!validate(existing)||existing.revision!==previousRevision)throw Error('This workspace changed in another tab. Reload before saving.');}next.revision=previousRevision+1;storage.setItem(KEY,JSON.stringify(next));}
export const className=(s      ,id       )=>{const c=s.classes.find(x=>x.id===id);return c?`Class ${c.grade} · ${c.section}`:'Archived class';};
export const person=(s      ,id       )=>s.students.find(x=>x.id===id)?.name||'Archived student';
export const teacher=(s      ,id       )=>s.teachers.find(x=>x.id===id)?.name||'Unassigned';
export function roster(s      ,classId       ,date       ){return s.students.filter(st=>st.enrollments.some(e=>e.classId===classId&&e.start<=date&&(!e.end||date<e.end)));}
export function assigned(s      ,teacherId       ,classId       ,date=today()){return s.allocations.some(a=>a.teacherId===teacherId&&a.classId===classId&&a.start<=date&&date<=a.end&&a.start<=today()&&today()<=a.end);}
export function visibleClasses(s      ,role       ,t       ){return s.classes.filter(c=>!c.archived&&(role==='admin'||assigned(s,t,c.id)));}
export function isSchoolDay(s      ,date       ){const day=new Date(date+'T12:00:00Z').getUTCDay();return date>=s.school.start&&date<=s.school.end&&!s.school.holidays.includes(date)&&(s.school.working.includes(date)||(day>0&&day<6));}
export function attendanceError(s      ,c       ,date       ,role       ,t       ){if(s.school.closed)return 'This academic year is closed.';if(!s.classes.some(x=>x.id===c&&!x.archived))return 'Select an active class.';if(date>today())return 'Future attendance cannot be recorded.';if(!isSchoolDay(s,date))return 'No attendance expected on this date.';if(role!=='admin'&&(!assigned(s,t,c,date)||date<shift(today(),-6)))return 'Teachers can edit assigned classes for today and the previous six dates.';return '';}
export function saveAttendance(s      ,c       ,date       ,entries                     ,submit        ,role       ,t       ,reason=''){
 const error=attendanceError(s,c,date,role,t);if(error)throw Error(error);let rec=s.attendance.find(x=>x.classId===c&&x.date===date);const ids=rec?.status==='submitted'?Object.keys(rec.entries):roster(s,c,date).map(x=>x.id);
 if(!ids.length)throw Error('Add students before taking attendance.');
 const clean=Object.fromEntries(ids.map(id=>[id,entries[id]||'']));if(Object.values(clean).some(x=>!['','present','absent','late'].includes(x          )))throw Error('Invalid attendance status.');
 if((submit||rec?.status==='submitted')&&Object.values(clean).some(x=>!x))throw Error('Mark every student before submitting.');
 if(rec?.status==='submitted'){if(!reason.trim())throw Error('A correction reason is required.');const changes=ids.filter(id=>clean[id]!==rec.entries[id]).map(id=>({studentId:id,before:rec.entries[id],after:clean[id]}));if(!changes.length)throw Error('Change at least one attendance status.');rec.audit.push({id:uid(),at:new Date().toISOString(),actor:role==='admin'?'Administrator':teacher(s,t),reason:reason.trim(),changes});}
 if(!rec){rec={id:uid(),classId:c,date,status:'draft',entries:{},audit:[]};s.attendance.push(rec);}rec.entries=clean;rec.status=submit||rec.status==='submitted'?'submitted':'draft';rec.savedAt=new Date().toISOString();return rec;
}
export function transfer(s      ,id       ,to       ,date       ){const st=s.students.find(x=>x.id===id);if(!st||st.archived)throw Error('Select an active student.');if(date<s.school.start||date>s.school.end)throw Error('Transfer date must be within the academic year.');if(!s.classes.some(c=>c.id===to&&!c.archived))throw Error('Choose an active destination class.');if(s.attendance.some(a=>a.date>=date&&a.status==='submitted'&&id in a.entries))throw Error('Submitted attendance exists on or after this date. Choose a later transfer date.');const current=st.enrollments.find(e=>!e.end);if(!current||date<current.start||current.classId===to)throw Error('Choose a different class and a date after enrollment.');current.end=date;st.enrollments.push({classId:to,start:date,end:''});}
export function balance(s      ,invoice    ){return (Math.round(invoice.amount*100)-s.payments.filter(p=>p.invoiceId===invoice.id&&!p.voided).reduce((a,p)=>a+Math.round(p.amount*100),0))/100;}
export function addPayment(s      ,invoiceId       ,amount       ){const inv=s.invoices.find(x=>x.id===invoiceId);if(!inv||!Number.isFinite(amount)||amount<=0||amount>balance(s,inv))throw Error('Enter an amount greater than zero and no higher than the balance.');const payment={id:uid(),invoiceId,amount,date:today(),voided:false,reason:''};s.payments.push(payment);return payment;}
export function saveSlot(s      ,slot    ){if(!s.allocations.some(a=>a.classId===slot.classId&&a.teacherId===slot.teacherId&&a.subject===slot.subject&&a.start<=today()&&today()<=a.end))throw Error('Assign this teacher and subject to the class first.');if(s.slots.some(x=>x.id!==slot.id&&x.day===slot.day&&x.period===slot.period&&(x.classId===slot.classId||x.teacherId===slot.teacherId)))throw Error('Conflict: this class or teacher already has a lesson in that period.');if(!weekdays.includes(slot.day)||slot.period<1||slot.period>6)throw Error('Choose a valid day and period.');const i=s.slots.findIndex(x=>x.id===slot.id);if(i<0)s.slots.push(slot);else s.slots[i]=slot;}
export function log(s      ,text       ){s.activity.unshift({id:uid(),text,at:new Date().toISOString()});s.activity=s.activity.slice(0,30);}
