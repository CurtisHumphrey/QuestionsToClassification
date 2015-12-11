module.exports = 
  outcomes:
    beginner: 
      level: 0
      title: "Beginner"
      text: "You're just starting to explore this skill"
      require: [{
        familiar: 0
      }]
    familiar:
      level: 1
      title: "Familiar"
      text: "You have basic knowledge of this skill, but plenty of room to learn more"
      require: [
        {
          proficient: 1
        }
        {
          familiar: 3
        }
      ]
    proficient:
      level: 2
      title: "Proficient"
      text: "You're comfortable using this skill in routine ways"
      require: [
        {
          proficient: 1
          expert: 2
        }
        {
          proficient: 3
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
