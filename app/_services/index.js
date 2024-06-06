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
};
