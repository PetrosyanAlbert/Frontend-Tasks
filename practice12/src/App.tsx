import { useQuery } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react";
import { GET_BASE } from "./graphql/queries";
import { SET_GRADE } from "./graphql/queries";
import { useState } from "react";
import { GradeModal } from "./GradeModal";

type Student = {
    id: string;
    fullName: string;
};

type Subject = {
    id: string;
    title: string;
};

type Grade = {
    studentId: string;
    subjectId: string;
    value: number;
};

type BaseQueryData = {
    students: Student[];
    subjects: Subject[];
    grades: Grade[];
};

export default function App() {
    const { data, loading } = useQuery<BaseQueryData>(GET_BASE);

    const [modalOpen, setModalOpen] = useState(false);

    const [selected, setSelected] = useState<{
        studentId: string;
        subjectId: string;
    } | null>(null);

    const [setGrade] = useMutation(SET_GRADE, {
        refetchQueries: [{ query: GET_BASE }],
    });

    const openModal = (studentId: string, subjectId: string) => {
        setSelected({ studentId, subjectId });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelected(null);
    };

    const handleSelectGrade = (value: number) => {
        if (!selected) return;

        setGrade({
            variables: {
                studentId: selected.studentId,
                subjectId: selected.subjectId,
                value,
            },
        });

        closeModal();
    };

    if (loading || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <p className="text-xl font-semibold text-gray-600">
                    Loading...
                </p>
            </div>
        );
    }

    const { students, subjects, grades } = data;

    const getGrade = (studentId: string, subjectId: string) => {
        return grades.find(
            (g) => g.studentId === studentId && g.subjectId === subjectId,
        )?.value;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                    📚 Student Diary
                </h1>

                {/* TABLE */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                    <th className="px-8 py-5 text-left font-bold sticky left-0 bg-gradient-to-r from-blue-600 to-indigo-600">
                                        Student
                                    </th>

                                    {subjects.map((subject) => (
                                        <th
                                            key={subject.id}
                                            className="px-6 py-5 text-center font-bold whitespace-nowrap"
                                        >
                                            {subject.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        {/* STUDENT NAME */}
                                        <td className="px-8 py-6 font-semibold text-gray-900 sticky left-0 bg-white border-r border-gray-200">
                                            {student.fullName}
                                        </td>

                                        {/* EMPTY CELLS */}
                                        {subjects.map((subject) => (
                                            <td
                                                key={subject.id}
                                                className="px-6 py-6 text-center border-r border-gray-200"
                                            >
                                                <button
                                                    onClick={() =>
                                                        openModal(
                                                            student.id,
                                                            subject.id,
                                                        )
                                                    }
                                                    className="text-2xl font-black hover:text-blue-600 transition"
                                                >
                                                    {getGrade(
                                                        student.id,
                                                        subject.id,
                                                    ) ?? "+"}
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <GradeModal
                open={modalOpen}
                onClose={closeModal}
                onSelect={handleSelectGrade}
            />
        </div>
    );
};
