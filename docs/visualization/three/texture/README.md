## 纹理

透明纹理：
alphaMap&transparent 属性：在 MeshBasicMaterial 纹理中设置 alphaMap 属性(黑白图片)，会和原始图叠加计算，黑表示全透明，白表示不透明。
还需要设置 transparent 才会有效果

side 属性：可以设置图片显示在哪个面上，例如：在平面上可以有正面、背面，双面 3 个选择

环境遮挡贴图&强度（叠加计算增强立体感，添加阴影）：
aoMap：需要设置第二组 uv
aoMapIntensity：设置阴影的强度
