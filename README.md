# Instructions to run the project

## Clone the project using 

```bash
git clone https://github.com/MenuraDewalegama/Music-Recommendation.git
```

## To build the image.
```bash
cd Music-Recommendation/
docker build -t jukebox .
```

## To run the container.
```bash
docker run --name jukebox_container -p 3000:3000 jukebox
```
http://localhost:3000/

## Access the application.
```bash
http://localhost:3000/
http://localhost:3000/api/student
```

## The /api/student output should look like.
``` bash
{"name":"Menura Pamodh Dewalegama","studentId":"224917579"}
```