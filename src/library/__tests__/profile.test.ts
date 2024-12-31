import { loadProfile, saveProfile, deleteProfile, loadProfiles } from '../profile';
import { ProfileData } from '../state';
import { jest } from '@jest/globals';
import { storageMock } from '../../../test/setup';

describe('Profile Management', () => {
  const testProfileName = 'Test Profile';
  const testProfileData: ProfileData = {
    region: 'us-east-1',
    bucket: 'test-bucket',
    key: 'test-key',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadProfile', () => {
    it('should load profile from storage', async () => {
      const mockData = { [testProfileName]: testProfileData };
      const mockedGet = jest.mocked(storageMock.sync.get);
      mockedGet.mockImplementation(() => Promise.resolve(mockData));

      const result = await loadProfile(testProfileName);
      expect(result).toEqual(testProfileData);
      expect(storageMock.sync.get).toHaveBeenCalledWith(testProfileName);
    });

    it('should return null if profile not found', async () => {
      const mockedGet = jest.mocked(storageMock.sync.get);
      mockedGet.mockImplementation(() => Promise.resolve({}));

      const result = await loadProfile('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('saveProfile', () => {
    it('should save profile to storage', async () => {
      const expectedData = { [testProfileName]: testProfileData };
      const mockedSet = jest.mocked(storageMock.sync.set);
      mockedSet.mockImplementation(() => Promise.resolve());

      await saveProfile(testProfileName, testProfileData);
      expect(storageMock.sync.set).toHaveBeenCalledWith(expectedData);
    });
  });

  describe('deleteProfile', () => {
    it('should delete profile from storage', async () => {
      const mockedRemove = jest.mocked(storageMock.sync.remove!);
      mockedRemove.mockImplementation(() => Promise.resolve());

      await deleteProfile(testProfileName);
      expect(storageMock.sync.remove).toHaveBeenCalledWith(testProfileName);
    });
  });

  describe('loadProfiles', () => {
    it('should load all profiles and default profile name', async () => {
      const mockStorage = {
        'Test Profile 1': testProfileData,
        'Test Profile 2': { ...testProfileData, region: 'us-west-2' },
        defaultProfile: 'Test Profile 1',
        debugMode: true,
      };

      const mockedGet = jest.mocked(storageMock.sync.get);
      mockedGet.mockImplementation(() => Promise.resolve(mockStorage));

      const result = await loadProfiles();
      expect(result).toEqual({
        profiles: {
          'Test Profile 1': testProfileData,
          'Test Profile 2': { ...testProfileData, region: 'us-west-2' },
        },
        defaultProfileName: 'Test Profile 1',
      });
    });

    it('should handle case with no default profile', async () => {
      const mockStorage = {
        'Test Profile': testProfileData,
      };

      const mockedGet = jest.mocked(storageMock.sync.get);
      mockedGet.mockImplementation(() => Promise.resolve(mockStorage));

      const result = await loadProfiles();
      expect(result).toEqual({
        profiles: {
          'Test Profile': testProfileData,
        },
        defaultProfileName: null,
      });
    });
  });
});
