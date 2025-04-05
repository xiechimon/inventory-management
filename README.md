# .env的配置：
## 1.后端
```
# Environment variables for development
NODE_ENV=

# JWT
JWT_SECRET=

# MongoDB
MONGO_URI=

# Cloudinary
CLOUDINARY_URL=

# Nodemailer
EMAIL_HOST=
EMAIL_USER=
EMAIL_PASS=

# AI API Address
AI_API_ADDRESS=
AI_API_MODEL=
```
- NODE_ENV：development | production
- JWT_SECRET：任意数字即可，如123456

### MONGO_URI
用于存放用户数据
https://cloud.mongodb.com/
1. 创建账号
2. 创建连接到数据库时的账号密码![2025 03 02 1](https://github.com/user-attachments/assets/0df38028-6b7a-429d-a193-38b65e5a1b89)

3. 添加当前的 IP 地址，在开发阶段也可以将 IP 全部放开，因为机器的 IP 可能会变化![2025 03 02 2](https://github.com/user-attachments/assets/7b31a01e-ed91-4ca5-aeb3-b187b339904e)

![2025 03 02 3](https://github.com/user-attachments/assets/16891ebb-77b6-41fd-b403-61887cfad40e)


4. 连接
5. 方式选择连接到应用程序
![2025 03 02 4](https://github.com/user-attachments/assets/23df8ea4-d103-47b3-a6a9-a7580b16869b)

6. 复制这一串代码，然后放到`.env`文件中，并且将密码替换成刚输入
![2025 03 02 5](https://github.com/user-attachments/assets/0103da5f-30cf-42b1-8735-07178e0a4b34)


7. 在这里我们可以看到数据库![2025 03 02 7](https://github.com/user-attachments/assets/22c579fa-451c-4de6-b1ac-bfed9b606f24)![2025 03 02 8](https://github.com/user-attachments/assets/16eefc1d-a382-4d85-8d83-6ced4447480b)



### CLOUDINARY_URL
忘记了，有需要联系我：xiechimon@qq.com


### Nodemailer
用于反馈问题
1. 设置![2025 03 07](https://github.com/user-attachments/assets/b120452f-a7c0-436f-87dc-81a41fb6f103)

2. 选中账号![2025 03 07 1](https://github.com/user-attachments/assets/f752747e-cd32-4923-981e-7ad39aa5e907)

3. 往下滑点击开启服务即可![2025 03 07 2](https://github.com/user-attachments/assets/e7271106-e2b3-45e3-bfad-b245eef21ef5)

4. 然后会给你一个密钥作为密码，填入`.env`中即可

### AI_API
[自行获取](https://cloud.siliconflow.cn/i/7R7NGleB)

## 2.前端
```
# 后端地址
REACT_APP_BACKEND_URL=http://localhost:5000

# Cloudinary
REACT_APP_CLOUDINARY_CLOUD_NAME=
REACT_APP_CLOUDINARY_UPLOAD_PRESET=

# AI
REACT_APP_CUSTOM_AI_API=
```
- cloudinary：忘记了有需要联系我xiechimon@qq.com
- AI：[自行获取](https://cloud.siliconflow.cn/i/7R7NGleB)
