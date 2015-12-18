module.exports = 
  outcomes:
    levels: ['beginner', 'familiar', 'proficient', 'expert']
    categories:
      beginner: 
        title: "Beginner"
        text: "You're just starting to explore data scientist skills"
        require_options: [{
          familiar: 0
        }]
      familiar:
        title: "Familiar"
        text: "You have basic data scientist skill knowledge, but plenty of room to learn more"
        require_options: [
          {
            proficient: 1
          }
          {
            familiar: 3
          }
        ]
      proficient:
        title: "Proficient"
        text: "You're comfortable using data scientist skills in routine ways"
        require_options: [
          {
            proficient: 1
            expert: 2
          }
          {
            proficient: 3
          }
        ]
      expert:
        title: "Expert"
        text: "You're comfortable teaching others the data scientist skills"
        require_options: [
          {
            expert: 5
          }
        ]
  topics: [
    {
      text: "R programming language"
      max: "expert"
    }
    {
      text: "Spark"
      max: "expert"
    }
    {
      text: "Map-Reduce"
      max: "expert"
    }
    {
      text: "Kaggle competitions"
      max: "expert"
    }
    {
      text: "NLP"
      max: "expert"
    }
    {
      text: "Python lambda functions"
      max: "proficient"
    }
    {
      text: "Python binary search"
      max: "proficient"
    }
    {
      text: "K-means clustering"
      max: "expert"
    }
    {
      text: "Multiclass classification"
      max: "proficient"
    }
    {
      text: "Linear regression"
      max: "proficient"
    }
    {
      text: "Histograms"
      max: "proficient"
    }
    {
      text: "SQL joins"
      max: "familiar"
    }
    {
      text: "Git"
      max: "familiar"
    }
    {
      text: "Python data plotting"
      max: "familiar"
    }
    {
      text: "Python data cleanning"
      max: "familiar"
    }
    {
      text: "Python Language"
      max: "familiar"
    }  
  ]
