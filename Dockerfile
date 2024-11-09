# Node.js rasmidan foydalanamiz
FROM node:18

# Ilovani ishchi papkaga ko'chirish
WORKDIR /app

# package.json va package-lock.json ni yuklab olish
COPY package*.json ./

# Bog‘lanishlarni o‘rnatish
RUN npm install

# Ilovani nusxalash
COPY . .

# Ilova 3000-portda ishlaydi
EXPOSE 3000

# Asosiy buyruq
CMD ["npm", "run", "start:dev"]
