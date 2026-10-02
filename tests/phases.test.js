import {test} from 'node:test';import assert from 'node:assert/strict';import {roadStages,caveStages,stageAt} from '../phases.js';
test('Road and cave each contain exactly 45 questions',()=>{for(const list of [roadStages,caveStages])assert.equal(list.reduce((n,s)=>n+s.count,0),45);});
test('Every cave question belongs to the correct obstacle',()=>{const keys=['torch','tiger','snake','spider','caveRocks'];for(let i=0;i<45;i++){const stage=stageAt('cave',i);assert.equal(stage.key,keys[Math.floor(i/9)]);assert.equal(stage.done,i%9);assert.equal(stage.number,Math.floor(i/9)+1);}});
test('Road ends at cave entrance without a treasure stage',()=>{assert.equal(stageAt('road',44).key,'fuel');assert.match(stageAt('road',44).title,/mağara/);assert.equal(stageAt('cave',45).done,9);});
