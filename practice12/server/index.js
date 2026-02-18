import fs from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { read, write } from "./store.js";

const typeDefs = `
    type Student {
        id: ID!
        fullName: String
    }

    type Subject {
        id: ID
        title: String
    }

    type Grade {
        studentId: ID
        subjectId: ID
        value: Int
    }

    type Query {
        students: [Student]
        subjects: [Subject]
        grades: [Grade]
    }
     
    type Mutation {
        setGrade(
            studentId: ID
            subjectId: ID
            value: Int
        ): Grade
    }
`;

const resolvers = {
    Query: {
        students: () => read().students,
        subjects: () => read().subjects,
        grades: () => read().grades,
    },
    Mutation: {
        setGrade: (_, { studentId, subjectId, value }) => {
            const data = read();
            const exist = data.grades.find(
                (g) => g.studentId === studentId && g.subjectId === subjectId,
            );
            if (exist) exist.value = value;
            else {
                data.grades.push({ studentId, subjectId, value });
            }
            write(data);
            return { studentId, subjectId, value };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: { port: 3001 },
});

console.log(`🚀 GraphQL ready at ${url}`);
