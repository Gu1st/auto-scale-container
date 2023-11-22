### Auto-Scale-Container

> 该项目是一款屏幕自适应插件，在不同分辨率的情况下，会利用 Scale 对指定容器进行等比例缩放，解决设备展示差异问题
>
> A container plug-in that adapts based on screen resolution size

#### Use

> import autoScaleContainer from 'auto-scale-container'

Use Commjs

> const autoScaleContainer = require('auto-scale-container')

##### Initialization

```javascript
autoScaleContainer("#app");
// Object
autoScaleContainer({
  designWidth: 1920, //设计稿
  designHeight: 929,
  container: "#app", //自适应缩放容器
  resize: true, //是否监听窗口变化事件
  ignore: [], // 要忽略的元素，不进行缩放的元素
  transition: "all 1s", // 过渡属性值
  delay: 1000, // 防抖间隔
});
```

当然您需要在挂载完成后进行初始化，否则插件内部获取不到 DOM,比如 Vue 中:

> You need to use it after the page is loaded, otherwise you will not be able to obtain the element

```javascript
onMounted(() => {
  autoScaleContainer();
});
```

##### Types

```typescript
interface DefaultObjectOptions {
  designWidth: number;
  designHeight: number;
  container: string;
  resize: boolean;
  ignore: ignoreList;
  transition: string;
  delay: number;
}
type DefaultOptions = string | DefaultObjectOptions;

declare function autoScaleContainer(options: DefaultOptions): void;
```

##### Off Listener

```
autoScaleContainer.off()
```
