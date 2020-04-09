#!/bin/bash

$(git diff --name-only ${TRAVIS_COMMIT_RANGE} | grep ../../udacity-c3-restapi-feed/Dockerfile > /dev/null)
dockerfile_status=$?

if [[ ${dockerfile_status} == "0" ]]
then
    docker build mohinigonawala90/backend-feed:latest ../../udacity-c3-restapi-feed/Dockerfile;
    export BUILD_FEED=true;
    docker tag $DOCKER_USER/backend-feed:latest $DOCKER_USER/backend-feed:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/backend-feed:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/backend-feed:latest;
else
    echo "New docker image for feed is not required";
fi

$(git diff --name-only ${TRAVIS_COMMIT_RANGE} | grep ../../udacity-c3-restapi-user/Dockerfile > /dev/null)
dockerfile_status=$?

if [[ ${dockerfile_status} == "0" ]]
then
    docker build mohinigonawala90/backend-user:latest ../../udacity-c3-restapi-user/Dockerfile;
      export BUILD_USER=true;
        docker tag $DOCKER_USER/backend-user:latest $DOCKER_USER/backend-user:${TRAVIS_BUILD_NUMBER};
          docker push $DOCKER_USER/backend-user:${TRAVIS_BUILD_NUMBER};
          docker push $DOCKER_USER/backend-user:latest;
else
    echo "New docker image for user is not required";
fi

$(git diff --name-only ${TRAVIS_COMMIT_RANGE} | grep ../../udacity-c3-frontend/Dockerfile > /dev/null)
dockerfile_status=$?

if [[ ${dockerfile_status} == "0" ]]
then
    docker build mohinigonawala90/backend-feed:latest ../../udacity-c3-frontend/Dockerfile;
      export BUILD_FRONTEND=true;
      docker tag $DOCKER_USER/frontend:latest $DOCKER_USER/frontend:${TRAVIS_BUILD_NUMBER};
                docker push $DOCKER_USER/frontend:${TRAVIS_BUILD_NUMBER};
                docker push $DOCKER_USER/frontend:latest;
else
    echo "New docker image for frontend is not required";
fi