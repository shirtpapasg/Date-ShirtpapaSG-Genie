import {VIDEOS} from "./videos.mjs";
import fs from "fs";
// chapter map: level -> episode no -> {theme, ch, pages, labs, note, status}
const P3 = {
 '0':  ['Study skills','Any chapter (P3 to P6)','','', 'Mind maps: use at the start of the year or before revision.'],
 '1A': ['Diversity','Ch 1 Diversity of Living and Non-living Things','pp. 2–8','1.1','New format. Covers diversity, living and non-living things.'],
 '1B': ['Diversity','Ch 1 Diversity of Living and Non-living Things','pp. 2–8','1.1','New format. Covers classification and similarities.'],
 '2A': ['Diversity','Ch 1 Diversity of Living and Non-living Things','pp. 9–13','1.2','New format. Living things need water and air: the drooping plant, wilting, oxygen.'],
 '2B': ['Diversity','Ch 1 Diversity of Living and Non-living Things','pp. 9–13','1.2','New format. Living things need food; plants make their own food when there is light.'],
 '3A': ['Diversity','Ch 1 Diversity of Living and Non-living Things','pp. 14–18','1.3','New format. Living things respond to changes: the mimosa, eyelids, a plant turning to the light.'],
 '3B': ['Diversity','Ch 1 Diversity of Living and Non-living Things','pp. 14–18','1.3','New format. Living things reproduce and grow; seeds, spores and extinct.'],
 '4':  ['Diversity','Ch 2 Classification of Living Things','pp. 19–33','2.1','Classic version: plants and all six animal groups in one video. The new 4A to 5B cover pp. 19–28 in more depth; insects, reptiles and mammals come next in the new format.'],
 '5':  ['Diversity','Ch 2 Classification of Living Things','pp. 34–44','2.2','Classic version. A new-format fungi and bacteria episode comes later.'],
 '6':  ['Diversity','Ch 3 Diversity of Materials','pp. 45–52','3.1',''],
 '7A': ['Diversity','Ch 3 Diversity of Materials','pp. 53–57','3.2–3.4',''],
 '7B': ['Diversity','Ch 3 Diversity of Materials','pp. 57–58','3.5, 3.6',''],
 '8':  ['Diversity','Ch 3 Diversity of Materials','pp. 59–72','3.7, 3.8','Includes the design process and the theme closure.'],
 '9':  ['Cycles','Ch 4 Life Cycles of Plants','pp. 73–79','4.1, 4.2',''],
 '10': ['Cycles','Ch 5 Life Cycles of Animals','pp. 80–89','5.1',''],
 '11': ['Cycles','Ch 5 Life Cycles of Animals','pp. 90–98','5.2',''],
 '12': ['Interactions','Ch 6 Properties of Magnets','pp. 99–106','6.1B, 6.2',''],
 '13': ['Interactions','Ch 6 Properties of Magnets','pp. 107–112','6.1A, 6.3, 6.4',''],
 '14A':['Interactions','Ch 7 Making and Using Magnets','pp. 113–117','7.1A, 7.1B',''],
 '14B':['Interactions','Ch 7 Making and Using Magnets','pp. 118–126','7.2',''],
};
const P4c = n => n==1?['Systems','Systems (theme opener)']: n<=4?['Systems','Ch 1 Plant System']: n<=7?['Systems','Ch 2 Human Systems']: n<=12?['Cycles','Ch 3 Matter']: n<=14?['Energy','Ch 4 Light']: n<=17?['Energy','Ch 5 Shadows']: n<=19?['Energy','Ch 6 Heat']:['Energy','Ch 7 Effects of Heat'];
const P5c = n => n<=8?['Cycles','Ch 1 Reproduction in Animals and Plants']:['Systems','Ch 4 The Human Respiratory and Circulatory Systems'];
const P6c = n => n<=3?['Energy','Ch 1 Photosynthesis','pp. 2–17']: n<=5?['Energy','Ch 2 Energy Conversion','pp. 18–47']: n<=8?['Interactions','Ch 3 Interaction of Forces','pp. 48–73']: n<=10?['Interactions','Ch 4 Interactions Within the Environment','pp. 74–87']:['Interactions','Ch 5 Surviving in the Environment','pp. 88–110'];
const out = [];
for (const L of VIDEOS.levels) for (const e of L.episodes) {
  const no = String(e.no); let theme, ch, pages='', labs='', note='';
  if (L.level==='P3') [theme,ch,pages,labs,note] = P3[no];
  else if (L.level==='P4') [theme,ch] = P4c(+no);
  else if (L.level==='P5') [theme,ch] = P5c(+no);
  else [theme,ch,pages] = P6c(+no);
  const ms = (e.moments||[]).map(m=>({at:m.at,what:m.what}));
  if (!labs) { const l = ms.filter(m=>/^Try it on/.test(m.what)).map(m=>m.what.replace(/^Try it on experiments? /,'')); labs = l.join('; '); }
  const id = (e.url.match(/v=([\w-]+)/)||[])[1];
  out.push({lv:L.level,no,theme,ch,pages,labs,note,title:e.title,len:e.len,id,topic:e.topic,m:ms.filter(m=>!/^Try it on/.test(m.what)).concat(ms.filter(m=>/^Try it on/.test(m.what)))});
}
const NEW = [
 {lv:'P3',no:'4A',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 19–22',labs:'2.1A',note:'New format. Why scientists classify, and the four groups: plants, animals, fungi and bacteria.',title:'Millions Of Living Things. Only 4 Groups? (Part A)',len:'4:59',id:'sZZh7fjmaKQ',topic:'Classifying Living Things',m:[]},
 {lv:'P3',no:'4B',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 19–22',labs:'2.1A',note:'New format. Flowering plants (seeds in fruits) and non-flowering plants (spores).',title:'No Flowers Today. Is It A Flowering Plant? (Part B)',len:'5:01',id:'HCDeYV32P8w',topic:'Classifying Living Things',m:[]},
 {lv:'P3',no:'5A',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 23–28',labs:'2.1B',note:'New format. Animals grouped by observable characteristics, starting with the outer covering.',title:'A Frog, A Bird And A Fish: One Group Or Three? (Part A)',len:'5:06',id:'zexMf4fY7Ms',topic:'Classifying Living Things',m:[]},
 {lv:'P3',no:'5B',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 23–28',labs:'2.1B',note:'New format. Amphibians, birds and fish, and the fish that walks on land.',title:'This Fish Walks On Land! Is It Really A Fish? (Part B)',len:'5:09',id:'1FGxQNHwrUo',topic:'Classifying Living Things',m:[]},
 {lv:'P3',no:'6A',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 29–33',labs:'2.3',note:'New format. Insects (6 legs, 3 body parts) and reptiles (dry scaly skin, cold-blooded). Journey: be a scale on a monitor lizard.',title:'Is A Spider An Insect? Count The Legs! (Part A)',len:'5:13',id:'fNZuqF2zDww',topic:'Classifying Living Things',m:[]},
 {lv:'P3',no:'6B',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 29–33',labs:'2.3',note:'New format. Mammals (hair or fur, milk, warm-blooded). Journey: be a hair on a fruit bat.',title:'Is A Bat A Bird? How To Spot A Mammal (Part B)',len:'5:14',id:'Ojuq9XJI66E',topic:'Classifying Living Things',m:[]},
 {lv:'P3',no:'7A',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 34–44',labs:'2.2',note:'New format. Fungi: mould grows on bread with no one feeding it; mushrooms, yeast, spores. Useful and harmful fungi. Journey: be a mould spore.',title:'We Sealed Bread in a Bag for 10 Days. What GREW? (Part 1)',len:'5:17',id:'v1WKPqkfQ7w',topic:'Classifying Living Things',m:[]},
 {lv:'P3',no:'7B',theme:'Diversity',ch:'Ch 2 Classification of Living Things',pages:'pp. 34–44',labs:'2.2',note:'New format. Bacteria: too small to see, found on our hands; useful (yoghurt) and harmful (tummy ache) bacteria; washing hands. Journey: be a bacterium.',title:'Your Hands LOOK Clean. What Is Living on Them? (Part 2)',len:'5:15',id:'PBoXgjYIun4',topic:'Classifying Living Things',m:[]},
 {lv:'P3',theme:'Diversity',ch:'Ch 3 Diversity of Materials',pages:'pp. 45–52',labs:'3.1',topic:'Materials',m:[],no:'8A',note:'New format. Objects and materials; glass, metal, plastic and ceramic and where each comes from, with look-closer moments (sand melting, clay in the kiln). Journey: be a grain of sand.',title:'This Jar Was Once SAND! What Are Things Made Of? (Part 1)',len:'5:50',id:'5-JcNGeLviE'},
 {lv:'P3',theme:'Diversity',ch:'Ch 3 Diversity of Materials',pages:'pp. 45–52',labs:'3.1',topic:'Materials',m:[],no:'8B',note:'New format. Wood, rubber and fabric and where each comes from (tree trunks, tree sap, woven threads). Journey: be a drop of sap.',title:'Your School Shoe Came from a TREE? (Part 2)',len:'5:27',id:'rfRyqc4PLXQ'}];
const old5 = out.findIndex(e => e.lv==='P3' && e.no==='5'); if (old5 >= 0) out.splice(old5, 1);   // old fungi video, replaced by 7A/7B
const old6 = out.findIndex(e => e.lv==='P3' && e.no==='6'); if (old6 >= 0) out.splice(old6, 1);   // old materials video, replaced by 8A/8B
const at = out.findIndex(e => e.lv==='P3' && e.no==='4'); out.splice(at, 1, ...NEW);
fs.writeFileSync('guide-data.json', JSON.stringify(out));
console.log(out.length, JSON.stringify(out).length);
