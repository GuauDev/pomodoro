export default function App() {
  return (
    <main className="bg-red-50 max-h-screen h-screen max-w-screen font-roboto-flex flex justify-center items-center text-optical ">
      <div className="flex flex-col items-center gap-[32px]">
        <div className="border-2 border-red-900 rounded-full flex items-center justify-center w-[136px] h-[48px] px-[16px] py-[8px] bg-red-alpha-100">
          <span className="text-red-900 font-label text-label">Focus</span>
        </div>
        <h1 className="font-timer-paused leading-timer text-timer text-red-900">25</h1>
        <h1 className="font-timer-paused leading-timer text-timer text-red-900">00</h1>
        <div className="flex gap-[16px] items-center justify-center">
          <button className="p-[24px] w-[80px] h-[80px] bg-red-alpha-100 rounded-[24px]" type="button">r</button>
          <button className="px-[48] py-[32] w-[128px] h-[96px] bg-red-alpha-700 rounded-[32px]" type="button">l</button>
          <button className="p-[24px] w-[80px] h-[80px] bg-red-alpha-100 rounded-[24px]" type="button">r</button>
        </div>
      </div>

    </main>
  );
}