var tipuesearch = {"pages":[{"text":"2016Fall 修課成員網誌","title":"About","url":"./pages/about/","tags":"misc"},{"text":"齒輪嚙合傳動13-17齒 利用漸開線原理, 以 Brython 繪製單一正齒輪廓: window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 17 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 #cobj = window.Cobj.new shape = window.Shape.new path = window.Path.new creategeartooth = window.createGearTooth.new tweener = window.Tweener.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 17 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.8*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = shape(data, { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = path(shapedefs.circle(hr)) shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path # setup the animation # backlash (mm) bklsh = 0.04*m # centre shift to make backlash dC = bklsh/(2*math.tan(math.pi*pa/180)) # np 為小齒輪齒數 np = 11 # gear ratio gr = n/np gearConfig = {'cx':-pr, 'cy':0, 'degs':[0, 360]} # gr*0.666 rpm #pinionConfig = {'cx':pr+dC, 'cy':0, 'degs':[0, -gr*360]} # 0.666 rpm twnr = tweener(0, 90000, \"loop\") cx = canvas.width/2 cy = canvas.height/2 #gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 #cgo.render(gear) # 利用 gear 資料複製一份, 命名為 gear1 gear1 = gear.dup() from time import time from browser.timer import request_animation_frame as raf from browser.timer import set_interval deg = math.pi/180 def draw(): cgo.clearCanvas() gear.rotate(2*deg) # 在特定位置, 以特定 scale, 特定 degs 執行 render cgo.render(gear, {'x':cx-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear1.rotate(-2*deg) cgo.render(gear1, {'x':cx+pr*2*0.5-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) set_interval(draw, 2)","title":"40423125_齒輪嚙合傳動11-17齒","url":"./40423125_chi-lun-nie-he-chuan-dong-11-17chi.html","tags":"Misc"},{"text":"齒輪嚙合傳動13-17齒 利用漸開線原理, 以 Brython 繪製單一正齒輪廓: window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 13 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 #cobj = window.Cobj.new shape = window.Shape.new path = window.Path.new creategeartooth = window.createGearTooth.new tweener = window.Tweener.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 17 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.8*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = shape(data, { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = path(shapedefs.circle(hr)) shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path # setup the animation # backlash (mm) bklsh = 0.04*m # centre shift to make backlash dC = bklsh/(2*math.tan(math.pi*pa/180)) # np 為小齒輪齒數 np = 13 # gear ratio gr = n/np gearConfig = {'cx':-pr, 'cy':0, 'degs':[0, 360]} # gr*0.666 rpm #pinionConfig = {'cx':pr+dC, 'cy':0, 'degs':[0, -gr*360]} # 0.666 rpm twnr = tweener(0, 90000, \"loop\") cx = canvas.width/2 cy = canvas.height/2 #gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 #cgo.render(gear) # 利用 gear 資料複製一份, 命名為 gear1 gear1 = gear.dup() from time import time from browser.timer import request_animation_frame as raf from browser.timer import set_interval deg = math.pi/180 def draw(): cgo.clearCanvas() gear.rotate(2*deg) # 在特定位置, 以特定 scale, 特定 degs 執行 render cgo.render(gear, {'x':cx-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear1.rotate(-2*deg) cgo.render(gear1, {'x':cx+pr*2*0.5-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) set_interval(draw, 2)","title":"40423125_齒輪嚙合傳動13-17齒","url":"./40423125_chi-lun-nie-he-chuan-dong-13-17chi.html","tags":"Misc"},{"text":"協同 2D 正齒輪傳動繪圖17齒 利用漸開線原理, 以 Brython 繪製單一正齒輪廓: window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 17 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx #ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 cobj = window.Cobj.new creategeartooth = window.createGearTooth.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 17 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.8*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = cobj(data, \"SHAPE\", { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = cobj(shapedefs.circle(hr), \"PATH\") shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path cx = canvas.width/2 cy = canvas.height/2 gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 cgo.render(gear)","title":"40423125_齒輪傳動17齒","url":"./40423125_chi-lun-chuan-dong-17chi.html","tags":"Misc"},{"text":"協同 2D 正齒輪傳動繪圖13齒 利用漸開線原理, 以 Brython 繪製單一正齒輪廓: window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 13 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx #ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 cobj = window.Cobj.new creategeartooth = window.createGearTooth.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 13 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.8*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = cobj(data, \"SHAPE\", { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = cobj(shapedefs.circle(hr), \"PATH\") shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path cx = canvas.width/2 cy = canvas.height/2 gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 cgo.render(gear)","title":"40423125_齒輪傳動13齒","url":"./40423125_chi-lun-chuan-dong-13chi.html","tags":"Misc"},{"text":"這學期的課程,學到了許多不同的繪圖軟體像是onshape,從這些軟體學習版本的重要性","title":"40423149  01/12 期末總結","url":"./40423149-0112-qi-mo-zong-jie.html","tags":"onshape HW"},{"text":"3D列印機組裝影片 底座裝配 上蓋 支架 線位開關 噴頭 支撐桿 滑軌 噴頭 平面 顯示器","title":"40423149 12/27 onshape 3D列印機作業","url":"./40423149-1227-onshape-3dlie-yin-ji-zuo-ye.html","tags":"onshape HW"},{"text":"組裝影片 40423149 from 40423149 on Vimeo .","title":"40423149  12/31 onshape 連桿組裝影片","url":"./40423149-1231-onshape-lian-gan-zu-zhuang-ying-pian.html","tags":"onshape HW"},{"text":"範例3D列印機組裝影片 自製3D列印機零件 支柱 連接桿 底盤 圓盤 自製3D列印機 自製3D列印機組裝影片","title":"40423149 12/20作業","url":"./40423149-1220zuo-ye.html","tags":"onshape HW"},{"text":"","title":"40423149組立","url":"./40423149zu-li.html","tags":"hw"},{"text":"40423149 11/24作業 Solvespace 1. Parts (零件繪製) 範例檔案: http://solvespace.com/bracket.pl An introductory tutorial is available, in which we draw the same part that is shown in the demo video. This covers most of the basic features of SolveSpace, including sketches, constraints, extrusions, and Boolean operations. When we first run SolveSpace, we will begin with an empty part. Initially, our view of the part will be oriented onto the XY plane; the label for that plane is displayed at the bottom left of the screen (#XY, in dark grey). The axes are also indicated by the three colored arrows at the bottom left; the X, Y, and Z axes are drawn in red, green, and blue respectively. When we hover the mouse over any entity, constraint, or other object in the sketch, that object will appear highlighted in yellow. For example, the XY plane, which is drawn as a dashed square, will appear highlighted when we hover the mouse over it. The YZ and ZX planes initially look like dashed lines, because they are being viewed on edge; but they still appear highlighted in yellow when we hold the mouse over them. It is similarly possible to highlight the X, Y, and Z axes (which are drawn as arrows), or the origin (which like all points is drawn as a green square). 翻譯 : 我們提供了一個介紹性教程，其中我們繪製演示視頻中顯示的相同部分。 這涵蓋了SolveSpace的大部分基本功能，包括草圖，約束，擠出和布爾運算。 當我們首次運行SolveSpace時，我們將從一個空的部分開始。最初，我們對零件的視圖將被定向到XY平面上;該平面的標籤顯示在屏幕的左下角（#XY，深灰色）。軸也由左下角的三個彩色箭頭指示; X，Y和Z軸分別繪製為紅色，綠色和藍色。 當我們將鼠標懸停在草圖中的任何實體，約束或其他對像上時，該對象將以黃色突出顯示。例如，當我們將鼠標懸停在其上時，繪製為虛線正方形的XY平面將突出顯示。 YZ和ZX平面最初看起來像虛線，因為它們被邊緣觀看;但是當我們把鼠標放在他們上面時，它們仍然顯示為黃色。同樣可以突出顯示X，Y和Z軸（以箭頭繪製）或原點（像所有點都繪製為綠色方塊）。 Extrude (平行長出或除料) STL 格式 範例:平行長出 STL 格式 範例:除料 Lathe (旋轉繞行長出或除料) Export Triangle Mesh STL 格式 three.js 2. Assembly (零件組立) 644401039 from 40423149 on Vimeo . 3. Linkages (fourbar & multilink) (四連桿與多連桿運動模擬) 4. Compiled & API (編譯與延伸應用) 使用 Virtualbox 虛擬主機執行 Windows 64 位元與 Ubuntu 64 位元環境中的編譯與延伸應用.","title":"40423149 11/24作業","url":"./40423149-1124zuo-ye.html","tags":"HW"},{"text":"40423149 10/27作業 心得:可以非常簡易的畫出四連桿運動的路線 Solvespace 四連桿圖檔: 40423149 w7.csv (請以滑鼠右鍵存檔) 40423149 w7.slvs (請以滑鼠右鍵存檔)","title":"40423149 10/27作業","url":"./40423149-1027zuo-ye.html","tags":"HW"},{"text":"40423105 9/29作業 40423149設計二甲蔡悌仁 from 40423149 on Vimeo . 心得 : 這是我第一次用這個軟體 不過很快就抓到訣竅了.","title":"40423149 9/29作業","url":"./40423149-929zuo-ye.html","tags":"HW"},{"text":"40423149 11/24上課筆記 9/22筆記 網址:http://chiamingyen.github.io/kmolab/blog/index.html 下載網址:140.130.17.17(只能在學校裡使用) 2016fall裡的檔案倒數兩個擇一下載(ana2016fall_os(3.0g)or mini2016fall.7z(98m)) 1.創2016fallcadp_hw 將README打勾 格式:python 加密:agpl 新增gh-pages分支 進入setting 點branches 將master變更為gh-pages 點update 2.git clone 2016fallcadp_hw cd 2016fallcadp_hw git branch git checkout gh-pages git branch(再次檢查) 3.創 學號.github.io 將README打勾 格式:python 加密:agpl 點選create new file 打入index.html 點commit new file 4.創 2016fallcadp_ag100(組別) 將README打勾 格式:python 加密:agpl 將2016fallcadp_ag100 clone下來 cd 2016fallcadp_ag100 git branch git checkout gh-pages git branch(再次檢查) 將自己的2016fallcadp_hw clone網址複製 git submodule add -b gh-pages 網址 學號 git staus(檢查) 依序將隊友的資料夾加入 git add -A git commit -m \"名稱\" git push origin gh-pages 完成 9/29筆記 1.radinsed半徑 2.diameter直徑 3.place放置 4.symmetrically對稱 5.lnitially開始 6.oriented定位 7.axes軸 8.indicated表示 9.respectively分別 10.parallel平行 11.extruding長出 12.automatically自動 13.coincident一模一樣 14.constraint約束 15.horizontal橫 16.perpendicular垂直 17.step圖(格式) 錄影工具:sharex 1.paths 2.task → screen recorder → options 開始錄製:shift+ print screen 射出成型軟體:moldex3d 簡報:shower.js 9/29作業 成品影片:https://vimeo.com/185029053 10/6筆記 proxy設定:proxy.mde.tw 通訊阜:3128 去聲音指令:ffmpeg.exe -i 檔名 -c copy -an out.mp4 字幕指令:ffmpeg.exe -i out.mp4 -vf subtitles=in.srt out2.mp4 安裝pelican指令:pip install pelican","title":"40423149 上課筆記","url":"./40423149-shang-ke-bi-ji.html","tags":"上課筆記"},{"text":"","title":"40423149四連桿機構","url":"./40423149si-lian-gan-ji-gou.html","tags":"Misc"}]};