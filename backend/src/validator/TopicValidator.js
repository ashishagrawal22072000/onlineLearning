import Joi from "joi";

class TopicValidator {
  createTopicSchema = Joi.object().keys({
    name: Joi.string().trim().min(2).max(100).required(),
    subtopics: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().trim().required(),
          level: Joi.string()
            .valid("easy", "medium", "hard")
            .default("easy")
            .required(),
          leetcodeLink: Joi.string().trim().required(),
          youtubeLink: Joi.string().trim().required(),
          articleLink: Joi.string().trim().required(),
        })
      )
      .min(1)
      .required(),
  });

  markAsCompleteSchema = Joi.object().keys({
    topicId: Joi.string().required(),
    subtopicId: Joi.string().required(),
    checked: Joi.boolean().required(),
  });
}

export const { createTopicSchema, markAsCompleteSchema } = new TopicValidator();
