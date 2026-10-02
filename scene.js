export function drawScene(canvas,{obstacle='rocks',cleared=0,travel=0,preview=false,treasure=false,time=0}={}){
 const dpr=Math.min(devicePixelRatio||1,2), w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
 if(canvas.width!==w*dpr||canvas.height!==h*dpr){canvas.width=w*dpr;canvas.height=h*dpr;}
 const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
 const sx=w/900,sy=h/360;c.scale(sx,sy);
 const sky=c.createLinearGradient(0,0,0,360);sky.addColorStop(0,'#d6e7d4');sky.addColorStop(1,'#f0e8c7');c.fillStyle=sky;c.fillRect(0,0,900,360);
 c.fillStyle='#fff1b7';c.beginPath();c.arc(720,68,34,0,Math.PI*2);c.fill();
 function mountain(x,y,size,col){c.fillStyle=col;c.beginPath();c.moveTo(x-size,y+size);c.lineTo(x,y);c.lineTo(x+size,y+size);c.fill();}
 mountain(200,70,240,'#b9cdb5');mountain(530,35,300,'#a9c3aa');mountain(800,100,240,'#c0cfac');
 c.fillStyle='#92ad81';c.beginPath();c.moveTo(0,215);c.quadraticCurveTo(200,150,440,218);c.quadraticCurveTo(680,155,900,210);c.lineTo(900,360);c.lineTo(0,360);c.fill();
 for(let i=0;i<14;i++){let x=(i*83-travel*300)%1100;if(x<0)x+=1100;let y=170+(i%3)*20;c.fillStyle=i%2?'#426c51':'#5c8058';c.beginPath();c.moveTo(x,y-42);c.lineTo(x-18,y+9);c.lineTo(x+18,y+9);c.fill();c.fillRect(x-3,y,6,22);}
 c.fillStyle='#c7b18a';c.beginPath();c.moveTo(0,272);c.bezierCurveTo(320,220,590,260,900,240);c.lineTo(900,324);c.bezierCurveTo(550,335,330,290,0,348);c.fill();
 c.strokeStyle='#af9872';c.lineWidth=2;for(let i=0;i<16;i++){const x=(i*75-travel*500)%1050;c.beginPath();c.moveTo(x,303);c.lineTo(x+25,299);c.stroke();}
 if(!preview&&!treasure){
 if(obstacle==='rocks'){for(let i=cleared;i<10;i++){let x=525+(i%5)*55,y=276+Math.floor(i/5)*28;c.fillStyle=i%2?'#7e8173':'#96998a';c.beginPath();c.moveTo(x-21,y+9);c.lineTo(x-16,y-15);c.lineTo(x+3,y-26);c.lineTo(x+22,y-12);c.lineTo(x+27,y+10);c.closePath();c.fill();c.strokeStyle='#676e60';c.stroke();}}
 if(obstacle==='lava'){c.fillStyle='#c65736';c.fillRect(520,250,190,77);c.strokeStyle='#ffc15a';c.lineWidth=5;for(let i=0;i<4;i++){c.beginPath();c.moveTo(530,265+i*15);for(let j=0;j<7;j++)c.lineTo(530+j*27,265+i*15+Math.sin(time*2+j)*5);c.stroke();}c.fillStyle='#817966';for(let i=0;i<cleared;i++)c.fillRect(530+i*18,278,15,18);}
 if(obstacle==='river'){c.fillStyle='#579baf';c.fillRect(525,245,200,90);c.strokeStyle='#b4dee0';c.lineWidth=3;for(let i=0;i<5;i++){c.beginPath();c.moveTo(530,260+i*15);c.lineTo(700,260+i*15+Math.sin(time+i)*5);c.stroke();}c.fillStyle='#9a7953';for(let i=0;i<cleared;i++)c.fillRect(525+i*20,270,17,25);}
 if(obstacle==='tire'||obstacle==='fuel'){c.font='64px sans-serif';c.fillText(obstacle==='tire'?'🛞':'⛽',620,285);}
 }
 if(treasure){c.fillStyle='#bd8034';c.fillRect(650,235,92,59);c.fillStyle='#e8af45';c.fillRect(645,219,102,27);c.fillStyle='#ffdc7a';c.fillRect(689,236,16,25);c.font='30px sans-serif';c.fillText('✦',680,200);}
 // Off-road vehicle, inspired by the green and orange reference car.
 c.save();c.translate(preview?310:230+travel*110,preview?255:275);if(travel)c.translate(0,Math.sin(time*18)*2);
 c.fillStyle='#53654433';c.beginPath();c.ellipse(4,52,138,15,0,0,Math.PI*2);c.fill();
 c.fillStyle='#243b32';c.fillRect(-75,-77,155,15);c.fillStyle='#44534a';c.fillRect(-56,-112,110,37);c.fillStyle='#536358';c.fillRect(-48,-105,94,21);
 c.fillStyle='#678b63';c.beginPath();c.moveTo(-120,3);c.lineTo(-99,-51);c.lineTo(-70,-66);c.lineTo(75,-66);c.lineTo(100,-7);c.lineTo(127,-1);c.lineTo(133,34);c.lineTo(-125,34);c.closePath();c.fill();
 c.fillStyle='#bddbc9';c.beginPath();c.moveTo(-93,-49);c.lineTo(-66,-56);c.lineTo(-22,-56);c.lineTo(-22,-8);c.lineTo(-108,-8);c.fill();c.fillStyle='#314a40';c.fillRect(-9,-56,73,49);
 c.fillStyle='#d98236';c.fillRect(-125,9,257,8);
 // Explorer in the driver seat: hat, face and orange jacket.
 c.fillStyle='#db9141';c.fillRect(-67,-27,28,23);c.fillStyle='#edc481';c.beginPath();c.arc(-54,-39,12,0,Math.PI*2);c.fill();c.fillStyle='#785c37';c.fillRect(-73,-50,38,6);c.fillRect(-64,-60,24,13);c.fillStyle='#25392d';c.fillRect(-51,-40,3,3);
 c.fillStyle='#ecdb82';c.fillRect(120,0,12,12);c.fillStyle='#314337';c.fillRect(-137,24,275,9);
 for(const x of [-80,83]){c.fillStyle='#222e2b';c.beginPath();c.ellipse(x,34,30,obstacle==='tire'&&!preview?22:32,0,0,Math.PI*2);c.fill();c.fillStyle='#81918a';c.beginPath();c.arc(x,34,18,0,Math.PI*2);c.fill();c.save();c.translate(x,34);c.rotate(travel*time*7);c.strokeStyle='#42534a';c.lineWidth=4;for(let i=0;i<6;i++){c.rotate(Math.PI/3);c.beginPath();c.moveTo(0,0);c.lineTo(16,0);c.stroke();}c.restore();}
 c.restore();
}
