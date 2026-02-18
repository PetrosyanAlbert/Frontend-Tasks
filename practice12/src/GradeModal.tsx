type Props = {
    open: boolean;
    onClose: () => void;
    onSelect: (value: number) => void;
};

export function GradeModal({ open, onClose, onSelect }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* backdrop */}

            {/* modal */}
            <div className="relative bg-white rounded-xl shadow-xl p-6 w-80">
                <h2 className="text-xl font-bold text-center mb-4">
                    Select grade
                </h2>

                <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((v) => (
                        <button
                            key={v}
                            onClick={() => onSelect(v)}
                            className="py-3 rounded-lg border text-lg font-bold hover:bg-blue-600 hover:text-white transition"
                        >
                            {v}
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
