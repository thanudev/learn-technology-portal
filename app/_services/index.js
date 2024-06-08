import { gql, request } from "graphql-request";

const MASTER_URL = `https://api-sa-east-1.hygraph.com/v2/${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}/master`;

const getAllCategorySubjects = async () => {
  const query = gql`
    query GetAllSubjectQuery {
      subjs(orderBy: createdAt_ASC, first: 100) {
        subject
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    return null;
  }
};

const getAllSubjectUnits = async () => {
  const query = gql`
    query MyQuery {
      subjectUnits(first: 1000, orderBy: publishedAt_DESC) {
        unitNumber
        unitName
        subject
        likes {
          ... on Like {
            id
            userEmail
          }
        }
        reviews(last: 100) {
          ... on Review {
            id
            review
            userEmail
            profileImage
          }
        }
        id
        author
        chapters {
          ... on Chapter {
            id
          }
        }
        createdAt
        banner {
          url
        }
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    return null;
  }
};

const getSubjectUnitsBySubject = async (subject) => {
  const query =
    gql`
      query MyQuery {
          subjectUnits(first: 1000, orderBy: unitNumber_ASC, where: {subject: ` +
    subject +
    `}) {
            unitNumber
            unitName
            chapters {
                ... on Chapter {
                  id
                }
              }
            author
            subject
            likes {
              ... on Like {
                id
                userEmail
              }
            }
            reviews(last: 100) {
              ... on Review {
                id
                userEmail
                review
                profileImage
              }
            }
            id
            createdAt
            banner {
              url
            }
          }
        }
        
      `;
  try {
    const result = await request(MASTER_URL, query);
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    return null;
  }
};

const getSubjectUnitById = async (id) => {
  const query =
    gql`
    query MyQuery {
      subjectUnit(where: {id: "` +
    id +
    `"}) {
        author
        banner {
          url
        }
        chapters {
          ... on Chapter {
            id
            chapterTitle
            content {
              html
              text
            }
          }
        }
        createdAt
        description {
          markdown
        }
        id
        likes {
          ... on Like {
            id
            userEmail
          }
        }
        reviews(last: 100) {
          ... on Review {
            id
            userEmail
            review
            profileImage
          }
        }
        unitName
        unitNumber
        subject
      }
    }
    
      `;
  try {
    const result = await request(MASTER_URL, query);
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    return null;
  }
};

const getLikes = async (id) => {
  const query =
    gql`
  query MyQuery {
    subjectUnit(where: {id: "` +
    id +
    `"}) {
      likes {
        ... on Like {
          id
          userEmail
        }
      }
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const likeUnit = async (email, id) => {
  const mutation =
    gql`mutation MyMutation {
      updateSubjectUnit(
        where: {id: "` +
    id +
    `"}
        data: {likes: {create: {Like: {data: {userEmail: "` +
    email +
    `"}}}}}
      ) {
        id
      }
      publishManySubjectUnitsConnection {
        edges {
          node {
            id
          }
        }
      } 
    }
    
      `;
  try {
    const result = await request(MASTER_URL, mutation);
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    return null;
  }
};

const addReview = async (unitId, profile, email, review) => {
  const mutation =
    gql`
    mutation MyMutation {
      updateSubjectUnit(
        where: {id: "` +
    unitId +
    `"}
        data: {reviews: {create: {Review: {data: {profileImage: "` +
    profile +
    `", review: "` +
    review +
    `", userEmail: "` +
    email +
    `"}}}}}
      ) {
        id
      }
      publishManySubjectUnitsConnection {
        edges {
          node {
            id
          }
        }
      }
    }
    
  `;
  const response = await request(MASTER_URL, mutation);
  return response;
};

const purchaseUnit = async (unitId, email) => {
  const mutation =
    gql`
    mutation MyMutation {
      createEnrollment(
        data: {subjectUnitId: "` +
    unitId +
    `", userEmail: "` +
    email +
    `", subjectUnit: {connect: {id: "` +
    unitId +
    `"}}}
      ) {
        id
      }
      publishManyEnrollmentsConnection {
        edges {
          node {
            id
          }
        }
      }
    }
    
  `;
  const response = await request(MASTER_URL, mutation);
  return response;
};

const getUnitEnrollment = async (email, unitId) => {
  const query =
    gql`
  query MyQuery {
    enrollments(
      where: {userEmail: "` +
    email +
    `", subjectUnitId: "` +
    unitId +
    `"}
    ) {
      userEmail
      subjectUnitId
      id
    }
  }
  
  
  `;

  const response = await request(MASTER_URL, query);
  return response;
};

const getUserCompletedChapterWithEmailAndUnit = async (unitId, email) => {
  const query =
    gql`
  query MyQuery {
    enrollments(
      where: {subjectUnitId: "` +
    unitId +
    `", userEmail: "` +
    email +
    `"}
    ) {
      id
      userEmail
      subjectUnitId
      completedChapters {
        ... on CompletedChapter {
          id
          chapterId
        }
      }
    }
  }
  
  `;
  try {
    const response = await request(MASTER_URL, query);
    return response;
  } catch (error) {
    return null;
  }
};

const updateCompletedChapter = async (enrollmentId, chapterID) => {
  const query =
    gql`
    mutation MyMutation {
      updateEnrollment(
        where: { id: "` +
    enrollmentId +
    `" }
        data: { 
          completedChapters: {
            create: { CompletedChapter: { data: { chapterId: "` +
    chapterID +
    `" } } }
          }
        }
      ) {
        id
      }
      publishManyEnrollmentsConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  try {
    const response = await request(MASTER_URL, query);
    return response;
  } catch (error) {
    return null;
  }
};

const createUser = async (email, uid, points, image, uname) => {
  const query =
    gql`
  mutation MyMutation {
    createUserInformation(
      data: {email: "` +
    email +
    `", name: "` +
    uname +
    `", points: ` +
    points +
    `, profilePicture: "` +
    image +
    `", uid: "` +
    uid +
    `"}
    ) {
      id
    }
    publishManyUserInformationsConnection {
      edges {
        node {
          id
        }
      }
    }
  }
  
  `;
  try {
    const response = await request(MASTER_URL, query);
    return response;
  } catch (error) {
    return null;
  }
};

const updatePoints = async (email, points) => {
  const query =
    gql`query MyQuery {
      userInformation(where: {email: "` +
    email +
    `"}) {
        points
      }
    }
    
  `;

  const response = await request(MASTER_URL, query);

  try {
    if (response?.userInformation?.points) {
      const total = response?.userInformation?.points + points;
      const mutation =
        gql`mutation MyMutation {
          updateUserInformation(
            data: {points: ` +
        points +
        `}
            where: {email: "` +
        email +
        `"}
          ) {
            id
          }
          publishManyUserInformationsConnection {
            edges {
              node {
                id
              }
            }
          }
        }
        
  `;
      const result = await request(MASTER_URL, mutation);
      if (result) {
        return result;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export {
  getAllCategorySubjects,
  getAllSubjectUnits,
  getSubjectUnitsBySubject,
  getSubjectUnitById,
  getLikes,
  likeUnit,
  addReview,
  purchaseUnit,
  getUnitEnrollment,
  getUserCompletedChapterWithEmailAndUnit,
  updateCompletedChapter,
  createUser,
  updatePoints,
};
