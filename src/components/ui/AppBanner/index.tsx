import { SingaporeLionIcon } from '@/components/icons';

const AppBanner = () => {
  return (
    <div className="bg-[#F0F0F0] px-4">
      <div className="flex flex-row items-center h-6 mx-auto max-w-6xl gap-2">
        <SingaporeLionIcon />
        <div className="text-xs text-[#5B5B5B]">
          An Official Website of the{' '}
          <span className="font-semibold">Singapore Government</span>
        </div>
      </div>
    </div>
  );
};

export default AppBanner;
