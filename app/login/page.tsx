import { AuthTabs } from "@/components/AuthTabs";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const currSearchParams = await searchParams;
  const message = currSearchParams.message as string;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthTabs message={message} />
    </div>
  );
}
