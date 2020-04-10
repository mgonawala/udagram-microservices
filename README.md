# Udagram Microservices

This project is a part of Udacity Cloud Developer nanodegree.
Main goal is to learn how to divide a monolith application into microservices.

Here, Monolith application has been divided into three separate services.
1.  Frontend (Iconic APP)
2.  Feed microservice (Node.js)
3.  User microservice (Node.js)

#### Goals

1.  Application should allow users to signup and login via a web client.
2.  It should allow users to create a feed, whose details will be stored in postgress on AWS.
3.  User should be able to upload images, which will be stored on AWS S3.
4.  User should be able to view all the feeds along with their images.
5.  Each service should be containerized and deployed in a Kubernetes cluster.
6.  Each service should be able to scale out and scale in independently.
7.  Application should have integrated CI/CD process.
8.  Application should support A/B deployment strategy.

## Getting Started

These instructions will help you set up a copy of the project and run it on local system or on AWS EKS cluster.

### Prerequisites

1. Install below dependencies.

    [Docker](https://docs.docker.com/get-docker/)
    
    [Docker-compose]()
  
    [AWS cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
  
   [Eksctl](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html)
  
    [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
 
    [Istio]()


### Instalation & setup

Clone this project on your local machine
````
git clone https://github.com/mgonawala/udagram-microservices.git
````

Build docker images for each service
```
cd udacity-c3-deployment/docker
docker-compose -f docker-compose-build.yaml
```

Check docker images on local docker registry after successful build.

````
docker images
````

Set Environment variables

````
      POSTGRESS_USERNAME: "your_username"
      POSTGRESS_PASSWORD: "your_password" 
      POSTGRESS_DB: "your_db" 
      POSTGRESS_HOST: "your_db_host" 
      AWS_REGION: "your_aws_region" 
      AWS_PROFILE: "your_profile" 
      AWS_BUCKET: "your_bucket"
      JWT_SECRET: "any_long_secret_key"
````

Run whole application

````
docker-compose up
````

Check if you application is running

```
curl http://localhsot:8100/api/v0/feed
```

Go to loalhost:8100 in browser and see if it is working as per below.

push docker images to docker hub registry

```
docker login -u username -p password
docker push your_docker_username/imagename:tag
```

Check your docker images in docke hub registry


## Deploy application AWS EKS using EKSCTL, KUBECTL



Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
