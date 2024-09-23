"'use client'"

export function CharacterProfile() {
  const characterDetails = [
    { label: "Gender", value: "Female" },
    { label: "Age", value: "+1000 years old" },
    { label: "Birthday", value: "22 September" },
    { label: "Height", value: "158 cm" },
    { label: "Zodiac Sign", value: "Virgo" },
    { label: "Fan Name", value: "Toramichis" },
    { label: "Emoji", value: "🧧🐯" },
  ]

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
      <div className="border border-[#e9a151] border-opacity-30 rounded-lg overflow-hidden text-xs text-left">
        {characterDetails.map((detail, index) => (
          <div
            key={detail.label}
            className={`flex ${
              index % 2 === 0 ? "'bg-pink-50'" : "'bg-white'"
            } border-b border-[#e9a151] border-opacity-30 last:border-b-0`}
          >
            <div className="w-1/2 px-6 py-3 font-semibold text-black-900">{detail.label}</div>
            <div className="w-1/2 px-4 py-3 text-gray-800">{detail.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
