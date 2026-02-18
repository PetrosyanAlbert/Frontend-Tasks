import { gql } from "@apollo/client";

export const GET_BASE = gql`
    query GetBase {
        students {
            id
            fullName
        }
        subjects {
            id
            title
        }
        grades {
            studentId
            subjectId
            value
        }
    }
`;

export const SET_GRADE = gql`
    mutation SetGrade(
        $studentId: ID
        $subjectId: ID
        $value: Int
    ) {
        setGrade (
            studentId: $studentId
            subjectId: $subjectId
            value: $value
        ) {
            studentId
            subjectId
        }
    }
`;
