import {today,shift,roster,className,teacher,balance,isSchoolDay,lessonsOn,periodTimes,subjectTone} from './model.js';
                                      
const escape=(value    )=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] ));
const currency=(n       )=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
const shortDate=(date       )=>new Date(date+'T12:00:00Z').toLocaleDateString('en-IN',{day:'numeric',month:'short'});
const glyphs                      ={
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 moon:'<path d="M20.8 13A9 9 0 0111 3.2 9 9 0 1020.8 13Z"/>',
 overview:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 attendance:'<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4m8-4v4M8 14l3 3 5-6"/>',
 students:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0112 0v3m1-16a3 3 0 010 6m2 4a5 5 0 013 5"/>',
 fees:'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 9h18m-13 6h3m5 0h1"/>',
 timetable:'<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4m8-4v4M3 10h18m-12 0v11m6-11v11"/>',
 allocation:'<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V3h6v2m-7 7h8m-8 4h5"/>',
 messages:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
 performance:'<path d="M4 4v16h16M8 14l4-5 4 3 5-7"/>',
 settings:'<path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 export:'<path d="M12 3v12m-4-8 4-4 4 4M4 14v6h16v-6"/>',
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 collapse:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m7-11-3 3 3 3"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4m0 3h.01"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 school:'<path d="m3 10 9-7 9 7M5 9v12h14V9m-9 12v-6h4v6M8 11h.01M16 11h.01"/>',
 spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
 activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>'
};
export function icon(name       ){return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[name]||glyphs.overview}</svg>`;}
function action(text       ,act       ,id='',cls=''){return `<button class="${cls}" data-act="${act}" data-id="${escape(id)}">${text}</button>`;}
function metric(title       ,value       ,detail       ,glyph       ,qualifier=''){return `<article class="metric-card"><div class="metric-title"><span>${title}</span>${icon(glyph)}</div><div class="metric-value">${value}</div><p>${qualifier?`<strong>${qualifier}</strong> `:''}${detail}</p></article>`;}


const attendanceLabels=['Present','Late','Absent'];
const attendanceKeys=['present','late','absent'];

function attendanceTrend(s      ,now       ,from       ,days       ,records      ,rosterSize       ){
 const dates=Array.from({length:days},(_,i)=>shift(from,i)).filter(d=>isSchoolDay(s,d)||records.some(r=>r.date===d));
 const bucketSize=days>7?Math.max(1,Math.ceil(dates.length/6)):1;
 const buckets=[];
 for(let i=0;i<dates.length;i+=bucketSize){
  const group=dates.slice(i,i+bucketSize),submitted=records.filter(r=>group.includes(r.date));
  const values=submitted.flatMap(r=>Object.values(r.entries));
  const counts=attendanceKeys.map(k=>values.filter(v=>v===k).length);
  buckets.push({first:group[0],last:group.at(-1) ,counts,total:counts.reduce((a,b)=>a+b,0),submitted:submitted.length,expected:group.length});
 }
 const max=Math.max(rosterSize,...buckets.map(b=>b.total),2),step=Math.ceil(max/2),scale=step*2;
 if(!buckets.length)return '<div class="empty chart-empty"><h3>No teaching dates in this range</h3><p>Choose a wider range or review the school calendar.</p></div>';
 if(!records.length)return '<div class="empty chart-empty"><h3>No submitted attendance</h3><p>A submitted register will appear here with its attendance counts.</p></div>';
 return `<div class="attendance-plot" role="group" aria-label="Submitted attendance from ${shortDate(from)} to ${shortDate(now)}" style="--bar-count:${buckets.length}">
 <div class="plot-scale" aria-hidden="true"><span>${scale}</span><span>${step}</span><span>0</span></div>
 <div class="plot-body"><div class="plot-grid" aria-hidden="true"><i></i><i></i><i></i></div><div class="plot-columns">${buckets.map(b=>{
  const range=shortDate(b.first)+(b.first===b.last?'':` – ${shortDate(b.last)}`),summary=`${range}: ${b.counts[0]} present, ${b.counts[1]} late, ${b.counts[2]} absent. ${b.submitted} of ${b.expected} registers submitted.`;
  return `<div class="plot-column" tabindex="0" role="img" aria-label="${summary}"><div class="plot-well" aria-hidden="true"><div class="plot-stack" style="--stack-size:${b.total/scale*100}%">${b.total?b.counts.map((n,i)=>n?`<i class="legend-${attendanceKeys[i]}" style="flex:${n}"></i>`:'').join(''):'<i class="legend-empty"></i>'}</div></div><span class="plot-label" aria-hidden="true">${b.first===b.last?shortDate(b.first):shortDate(b.first)+'<br>– '+shortDate(b.last)}</span><span class="plot-tip" aria-hidden="true"><strong>${range}</strong>${b.counts[0]} present · ${b.counts[1]} late · ${b.counts[2]} absent<small>${b.submitted}/${b.expected} registers submitted</small></span></div>`;
 }).join('')}</div></div></div><div class="chart-legend">${[...attendanceLabels,'No submission'].map((label,i)=>`<span><i class="legend-${attendanceKeys[i]||'empty'}"></i>${label}</span>`).join('')}</div>`;
}

function attendanceBreakdown(latest    ){
 const entries=latest?Object.values(latest.entries):[],counts=attendanceKeys.map(k=>entries.filter(x=>x===k).length),total=counts.reduce((a,b)=>a+b,0);
 const path='M 24 109 A 86 86 0 0 1 196 109';
 let offset=0;
 const segments=counts.map((count,i)=>{
  if(!count)return '';
  const span=count/total*100,start=offset;offset+=span;
  return `<path d="${path}" pathLength="100" data-status="${attendanceKeys[i]}" stroke-dasharray="${span} 100" stroke-dashoffset="-${start}"/>`;
 }).join('');
 return `<section class="panel distribution-panel" aria-labelledby="attendance-breakdown-title"><div class="panel-title"><h2 id="attendance-breakdown-title">${icon('students')}Attendance breakdown</h2><span class="panel-date">${total?shortDate(latest.date):'No register'}</span></div><p class="panel-subtitle">${total?'Latest submitted register':'No submission in this range'}</p><div class="attendance-gauge"><svg viewBox="0 0 220 121" role="img" aria-label="Latest register: ${counts[0]} present, ${counts[1]} late, ${counts[2]} absent"><g fill="none" stroke-width="13"><path d="${path}" class="gauge-track"/>${segments}</g></svg><div class="gauge-value" aria-hidden="true"><strong>${total||'—'}</strong><small>${total?'Students marked':'No data'}</small></div></div><div class="gauge-legend">${attendanceLabels.map((label,i)=>`<div><span><i class="legend-${attendanceKeys[i]}"></i>${label}</span><strong>${counts[i]}</strong><small>${total?Math.round(counts[i]/total*1000)/10+'%':'—'}</small></div>`).join('')}</div></section>`;
}

export function dashboard(s      ,classId       ,role       ,days       ){
 const now=today(),from=shift(now,-days+1),students=roster(s,classId,now),records=s.attendance.filter(a=>a.classId===classId&&a.date>=from&&a.date<=now&&a.status==='submitted').sort((a,b)=>a.date.localeCompare(b.date));
 const latest=records.at(-1),values=records.flatMap(a=>Object.values(a.entries)),total=values.filter(v=>v==='present'||v==='late'||v==='absent').length,rate=total?Math.round(values.filter(x=>x==='present'||x==='late').length/total*100):null;
 const working=isSchoolDay(s,now),invoices=s.invoices.filter(i=>(i.classId||s.students.find(st=>st.id===i.studentId)?.enrollments[0]?.classId)===classId),due=invoices.reduce((n,i)=>n+balance(s,i),0);
 const allocations=s.allocations.filter(a=>a.classId===classId&&a.start<=now&&a.end>=now),messages=s.messages.filter(m=>m.classId===classId).sort((a,b)=>b.date.localeCompare(a.date)),assessments=s.assessments.filter(a=>a.classId===classId),scored=assessments.flatMap(a=>Object.values(a.scores).filter(v=>v!=null).map(v=>(v          )/a.max*100)),average=scored.length?Math.round(scored.reduce((a,b)=>a+b,0)/scored.length):null;
 const slots=lessonsOn(s,classId,now),currentDay=new Date(now+'T12:00:00Z').toLocaleDateString('en-US',{weekday:'long'});
 return `<div class="metrics-grid" aria-label="Class summary">
 ${metric('Total students',String(students.length),'Currently enrolled','students')}
 ${metric('Attendance rate',rate===null?'—':rate+'%',rate===null?'No submitted attendance':'Present + late','attendance')}
 ${role==='admin'?metric('Outstanding fees',currency(due),'open invoices','fees',String(invoices.filter(i=>balance(s,i)>0).length)):metric('Class average',average===null?'—':average+'%','recorded assessments','performance',String(assessments.length))}
 ${metric('Class teachers',String(new Set(allocations.map(a=>a.teacherId)).size),'active subject assignments','allocation',String(allocations.length))}
 </div>
 <div class="analytics-grid">${attendanceBreakdown(latest)}<section class="panel trend-panel" aria-labelledby="attendance-trend-title"><div class="panel-title"><h2 id="attendance-trend-title">${icon('performance')}Attendance trend</h2><span class="panel-date">${shortDate(from)} – ${shortDate(now)}</span></div><div class="chart-summary">${total} student-days recorded <span aria-hidden="true">·</span> ${records.length} submitted ${records.length===1?'register':'registers'}</div>${attendanceTrend(s,now,from,days,records,students.length)}</section></div>
 <div class="details-grid"><section class="panel schedule-panel"><div class="panel-title"><h2>${icon('timetable')}Today’s timetable</h2><span class="panel-subtitle">${working?slots.length+' lessons':'Non-teaching day'}</span></div><p class="panel-subtitle">${currentDay}, ${shortDate(now)} <span>·</span> ${escape(className(s,classId))}</p>${working&&slots.length?slots.map(slot=>`<div class="schedule-item subject-tone-${subjectTone(slot.subject)}"><span class="lesson-time">${periodTimes[slot.period-1]}<small>Period ${slot.period}</small></span><span class="lesson-indicator" aria-hidden="true"></span><span class="lesson-details"><strong>${escape(slot.subject)}</strong><small>${escape(teacher(s,slot.teacherId))} · ${escape(slot.room)}</small></span></div>`).join(''):`<div class="empty schedule-empty">${icon('timetable')}<h3>${working?'No lessons scheduled':'School closed today'}</h3><p>${working?'Lessons for this class will appear here when scheduled.':'Weekly lessons are not shown on non-teaching days.'}</p></div>`}</section><section class="panel updates-panel"><div class="panel-title"><h2>${icon('messages')}Parent updates</h2>${action('Compose '+icon('plus'),'compose','','text-button')}</div><p class="panel-subtitle">Class communication · simulated delivery</p>${messages.length?`<div class="table-wrap"><table class="updates-table"><thead><tr><th>Update</th><th>Audience</th><th>Status</th></tr></thead><tbody>${messages.slice(0,3).map(m=>`<tr><td><span class="update-title">${escape(m.title)}</span><small>${shortDate(m.date)}</small></td><td>${m.recipients.length} ${m.recipients.length===1?'family':'families'}</td><td><span class="badge ${m.status==='Draft'?'sand':'mint'}">${m.status==='Draft'?'Draft':'Simulated sent'}</span></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><h3>No class updates yet</h3><p>Compose a fictional update for the families in this class.</p></div>'}</section></div>
 <section class="panel activity"><div class="panel-title"><h2>${icon('activity')}Recent activity</h2><span class="panel-subtitle">Saved in this browser</span></div>${s.activity.length?s.activity.slice(0,4).map(a=>`<div class="activity-row"><span class="activity-dot"></span><span>${escape(a.text)}</span><small>${new Date(a.at).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})}</small></div>`).join(''):'<p class="panel-subtitle activity-empty">Your saved actions will appear here. Explore a module to get started.</p>'}</section>`;
}
