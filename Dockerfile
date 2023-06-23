# FROM alpine:latest

# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN apk add vips-dev --update-cache --repository http://wjordan-apk.s3.amazonaws.com/ --allow-untrusted
# RUN apk add nodejs npm g++ make




# ENV PYTHONUNBUFFERED=1

# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

# RUN python3 -m ensurepip

# RUN pip3 install --no-cache --upgrade pip setuptools


# FROM alpine:latest
# RUN npm install -g npm@latest
# WORKDIR /usr/src/app
# COPY package*.json .



# RUN npm install --platform=linux --arch=x64 sharp
# RUN npm install --ignore-scripts=false --verbose sharp
# RUN npm install 
# RUN npm install --platform=linux --arch=arm64v8 --ignore-scripts=false --foreground-scripts --verbose
# RUN npm install --arch=arm64v8 --platform=linuxmusl --libc=glibc sharp


# COPY . .

# CMD ["npm", "start"]
# RUN npm run build

# FROM --platform=linux/amd64 node:20 AS runner

# COPY --from=development . .




FROM alpine:latest

RUN apk add git nodejs npm

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN echo localhost:8080

CMD ["npm", "run", "start"]
