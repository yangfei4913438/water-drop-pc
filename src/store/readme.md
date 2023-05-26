#### 说明

jotai是用来替代React.useState来使用的。一个原子化的状态管理库，正常使用无需全局的上下文组件包裹。

#### 陷阱

因为是高度原子化的设计，所以可能出现一个原子在无数的地方被修改，导致了数据极其的混乱，你根本没办法去管理你的数据了。

#### 解决方案

我们可以通过封装成hooks的方法，把原子数据的获取、变更，都封装在一个hook里面。
所有的外部使用，都只能通过封装好的hook来处理，这样就可以完美的解决数据治理混乱的问题。