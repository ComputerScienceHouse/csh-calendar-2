docker build --tag ccal2-docker .
docker run --net host --rm ccal2-docker
docker rmi ccal2-docker