import { useOrbis } from '@/orbis/useOrbis';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from './ui/Button';
import { Form } from './ui/Form';
import { Input } from './ui/Input';
import { Modal } from './ui/Modal';
import { Textarea } from './ui/Textarea';

interface ProfileInput {
  username: string;
  bio: string;
}

export const ModalProfileForm = ({
  profile,
  open,
  onClose,
}: {
  profile: any;
  open: boolean;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const orbis = useOrbis();
  const form = useForm<ProfileInput>({
    defaultValues: {
      username: profile?.username || '',
      bio: profile?.details.profile?.data.bio || '',
    },
  });

  const onSubmit: SubmitHandler<ProfileInput> = async (data) => {
    setLoading(true);

    const res = await orbis.updateProfile({
      username: data.username,
      data: {
        bio: data.bio,
      },
    });

    setLoading(false);

    if (res.status === 300) {
      toast.error('Error creating post');
      return;
    }

    if (res.status === 200) {
      onClose();
      toast.success('Saved');
    }
  };

  return (
    <Modal open={open} title="Edit Profile" onClose={onClose}>
      <Form className="!space-y-0" form={form} onSubmit={onSubmit}>
        <div className="space-y-2 p-4">
          <Input
            label="Display name"
            type="text"
            placeholder="Enter name"
            {...form.register('username')}
          />
          <div>
            <Textarea
              label="Bio"
              placeholder="Tell your story"
              className="s-input !rounded-3xl"
              {...form.register('bio')}
            />
          </div>
        </div>
        <div className="p-4">
          <Button loading={loading} className="w-full" primary>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
